import { injectable } from "inversify";
import { OrderRepositoryInterface } from "../domain/repositories/order.repository.interface";
import { Order } from "../domain/models/order.model";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";

@injectable()
export class OrderRepositoryImpl implements OrderRepositoryInterface {
  private readonly db: Repository<Order>;

  constructor() {
    this.db = AppDataSource.getRepository(Order);
  }

  async createOrderReturns(order: Order): Promise<Order> {
    return await this.db.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.order_returns", "order_returns")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .getMany();

    orders.forEach((order) => {
      order.user.password_user = "";
    });

    return orders;
  }
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const orders = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.order_returns", "order_returns")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .where("order.user.id_user = :userId", { userId })
      .getMany();

    orders.forEach((order) => {
      order.user.password_user = "";
    });

    return orders;
  }

  async createOrder(order: Order): Promise<Order> {
    return await this.db.manager.save(order);
  }
  async updateOrder(order: Order): Promise<Order> {
    return await this.db.manager.save(order);
  }
  async getOrderById(id: number): Promise<Order | null> {
    const order = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.order_returns", "order_returns")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .where("order.id_order = :id", { id })
      .getOne();

    if (order) {
      order.user.password_user = "";
    }

    return order;
  }
}
