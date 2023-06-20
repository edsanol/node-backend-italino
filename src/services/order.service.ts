import { Order } from "../domain/models/order.model";
import { OrderServiceInterface } from "../interfaces/order.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { OrderRepositoryInterface } from "../domain/repositories/order.repository.interface";
import { OrderDetail } from "../domain/models/order-detail.model";
import { OrderDetailRepositoryInterface } from "../domain/repositories/order-detail.repository.interface";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { CustomerRepositoryInterface } from "../domain/repositories/customer.repository.interface";
import { IOrderDto } from "../dto/orderDto";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { OrderReturn } from "../domain/models/order-return.model";
import { OrderReturnRepositoryInterface } from "../domain/repositories/order-return.respository.interface";

@injectable()
export class OrderServiceImpl implements OrderServiceInterface {
  constructor(
    @inject(TYPES.OrderRepository)
    private readonly orderRepository: OrderRepositoryInterface,
    @inject(TYPES.OrderDetailRepository)
    private readonly orderDetailRepository: OrderDetailRepositoryInterface,
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: CustomerRepositoryInterface,
    @inject(TYPES.InventoryRepository)
    private readonly inventoryRepository: InventoryRepositoryInterface,
    @inject(TYPES.OrderReturnRepository)
    private readonly orderReturnRepository: OrderReturnRepositoryInterface
  ) {}

  async createOrderReturns(order: IOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.getOrderById(order.id!);
    const inventories = await Promise.all(
      order.orderDetails.map(async (orderDetail) => {
        const inventory = await this.inventoryRepository.getInventoryById(
          orderDetail.inventoryId
        );
        if (!inventory) {
          throw new Error("Inventory not found");
        }
        return {
          orderDetail,
          inventory,
        };
      })
    );

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    const inventoryToReturn = order.OrderReturns;
    if (!inventoryToReturn) {
      throw new Error("Inventory to return not found");
    }

    const updatedOrderDetails: OrderDetail[] = [];
    const orderReturn: OrderReturn[] = [];
    let totalOrder: number = 0;

    for (const { inventory } of inventories) {
      const matchingReturn = inventoryToReturn.find(
        (item) => item.inventoryId === inventory.id_inventory
      );

      const orderDetail = existingOrder.order_details.find(
        (item) => item.inventory.id_inventory === inventory.id_inventory
      );

      if (!orderDetail) {
        throw new Error("Order detail not found");
      }

      if (matchingReturn) {
        if (matchingReturn.quantity > orderDetail.quantity) {
          throw new Error("Invalid return quantity");
        }
      }

      const newOrderDetail = new OrderDetail();
      newOrderDetail.id_order_detail = orderDetail.id_order_detail!;
      newOrderDetail.inventory = inventory;
      newOrderDetail.quantity =
        orderDetail.quantity - matchingReturn?.quantity!;
      newOrderDetail.updated_at = new Date();
      updatedOrderDetails.push(newOrderDetail);

      totalOrder += inventory.selling_price_inventory * newOrderDetail.quantity;

      const newOrderReturn = new OrderReturn();
      newOrderReturn.inventory = inventory;
      newOrderReturn.quantity = matchingReturn?.quantity!;
      newOrderReturn.created_at = new Date();
      newOrderReturn.updated_at = new Date();
      orderReturn.push(newOrderReturn);
    }

    const newOrder = new Order();
    newOrder.id_order = existingOrder.id_order;
    newOrder.customer = existingOrder.customer;
    newOrder.user = existingOrder.user;
    newOrder.order_details = updatedOrderDetails;
    newOrder.order_returns = [...existingOrder.order_returns, ...orderReturn];
    newOrder.total_order = totalOrder;
    newOrder.updated_at = new Date();
    newOrder.payment_order = existingOrder.payment_order;
    newOrder.type_order = existingOrder.type_order;
    newOrder.status_order = existingOrder.status_order;

    await this.orderRepository.updateOrder(newOrder);

    const orderUpdated = await this.orderRepository.getOrderById(
      existingOrder.id_order
    );

    if (!orderUpdated) {
      throw new Error("Order not found");
    }

    for (const updatedOrderDetail of updatedOrderDetails) {
      updatedOrderDetail.order = orderUpdated;
    }

    for (const order of orderReturn) {
      order.order = orderUpdated;
    }

    await Promise.all([
      this.orderDetailRepository.createManyOrderDetails(updatedOrderDetails),
      this.orderReturnRepository.createManyOrderReturns(orderReturn),
    ]);

    await Promise.all(
      orderReturn.map(async (orderReturn) => {
        const inventory = await this.inventoryRepository.getInventoryById(
          orderReturn.inventory.id_inventory
        );
        if (!inventory) {
          throw new Error("Inventory not found");
        }
        inventory.stock_inventory += orderReturn.quantity;
        await this.inventoryRepository.updateInventory(inventory);
      })
    );

    const orderToReturn = await this.orderRepository.getOrderById(
      existingOrder.id_order
    );

    if (!orderToReturn) {
      throw new Error("Order not found");
    }

    return orderToReturn;
  }

  async createOrder(order: IOrderDto): Promise<Order> {
    const [user, customer, inventories] = await Promise.all([
      this.userRepository.getUserById(order.userId),
      this.customerRepository.getCustomerById(order.customerId),
      Promise.all(
        order.orderDetails.map(async (orderDetail) => {
          const inventory = await this.inventoryRepository.getInventoryById(
            orderDetail.inventoryId
          );
          if (!inventory) {
            throw new Error("Inventory not found");
          }
          return {
            orderDetail,
            inventory,
          };
        })
      ),
    ]);

    if (!user || !customer) {
      throw new Error("User not found");
    }

    let totalOrder: number = 0;
    const orderDetails: OrderDetail[] = [];

    for (const { orderDetail, inventory } of inventories) {
      if (inventory.stock_inventory < orderDetail.quantity) {
        throw new Error("Inventory not enough");
      }

      totalOrder += inventory.selling_price_inventory * orderDetail.quantity;

      const newOrderDetail = new OrderDetail();
      newOrderDetail.inventory = inventory;
      newOrderDetail.quantity = orderDetail.quantity;
      newOrderDetail.created_at = new Date();
      newOrderDetail.updated_at = new Date();
      orderDetails.push(newOrderDetail);
    }

    const newOrder = new Order();
    newOrder.customer = customer;
    newOrder.user = user;
    newOrder.status_order = order.statusOrder;
    newOrder.payment_order = order.paymentOrder;
    newOrder.type_order = order.typeOrder;
    newOrder.total_order = totalOrder;
    newOrder.created_at = new Date();
    newOrder.updated_at = new Date();

    const createdOrder = await this.orderRepository.createOrder(newOrder);

    for (const orderDetail of orderDetails) {
      orderDetail.order = createdOrder;
    }

    await this.orderDetailRepository.createManyOrderDetails(orderDetails);

    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        const inventoryItem = orderDetail.inventory;
        inventoryItem.stock_inventory -= orderDetail.quantity;
        await this.inventoryRepository.updateInventory(inventoryItem);
      })
    );

    const returnOrder: any = {
      customer: {
        id_customer: createdOrder.customer.id_customer,
        name_customer: createdOrder.customer.name_customer,
        address_customer: createdOrder.customer.address_customer,
        phone_customer: createdOrder.customer.phone_customer,
      },
      user: {
        id_user: createdOrder.user.id_user,
        name_user: createdOrder.user.name_user,
        rol: {
          id_rol: createdOrder.user.rol.id_role,
          name_rol: createdOrder.user.rol.name_role,
        },
      },
      status_order: createdOrder.status_order,
      payment_order: createdOrder.payment_order,
      type_order: createdOrder.type_order,
      total_order: createdOrder.total_order,
      id_order: createdOrder.id_order,
    };

    return returnOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getAllOrders();
    return orders;
  }

  async updateOrder(order: IOrderDto): Promise<Order> {
    const newOrder = new Order();
    newOrder.id_order = order.id!;
    newOrder.status_order = order.statusOrder;
    newOrder.payment_order = order.paymentOrder;
    newOrder.type_order = order.typeOrder;
    newOrder.total_order = order.totalOrder;
    newOrder.updated_at = new Date();

    if (newOrder.status_order === "Cancelado") {
      const order = await this.orderRepository.getOrderById(newOrder.id_order!);
      if (!order) {
        throw new Error("Order not found");
      }

      await Promise.all(
        order.order_details.map(async (orderDetail) => {
          const inventoryItem = orderDetail.inventory;
          inventoryItem.stock_inventory += orderDetail.quantity;
          await this.inventoryRepository.updateInventory(inventoryItem);
        })
      );
    }

    await this.orderRepository.updateOrder(newOrder);

    const updatedOrder = await this.orderRepository.getOrderById(order.id!);

    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return updatedOrder;
  }

  async getOrderById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.getOrderById(id);
    return order;
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.getOrdersByUserId(userId);
    return orders;
  }
}
