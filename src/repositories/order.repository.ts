import { injectable } from "inversify";
import { OrderRepositoryInterface } from "../domain/repositories/order.repository.interface";
import { Order } from "../domain/models/order.model";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { IOrderStatsDto } from "dto/orderStatsDto";

@injectable()
export class OrderRepositoryImpl implements OrderRepositoryInterface {
  private readonly db: Repository<Order>;

  constructor() {
    this.db = AppDataSource.getRepository(Order);
  }

  async getOrderProduction(): Promise<Order[]> {
    const orders = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .where("order.status_order = :status1", { status1: "Salida" })
      .orWhere("order.status_order = :status2", { status2: "Entregado" })
      .orderBy("order.created_at", "DESC")
      .limit(500)
      .getMany();

    return orders;
  }

  async getOrderInfo(): Promise<IOrderStatsDto> {
    const totalOrders = await this.db.count();
    const totalOrdersDelivered = await this.db.count({
      where: { status_order: "Salida" },
    });
    const totalOrdersPending = await this.db.count({
      where: { status_order: "Entregado" },
    });
    const totalOrdersCanceled = await this.db.count({
      where: { status_order: "Cancelado" },
    });
    const totalOrdersInProcess = await this.db.count({
      where: { status_order: "Pendiente" },
    });
    // top 5 products most sold
    const productsMostSold = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .select("inventory.id_inventory", "id")
      .addSelect("inventory.name_inventory", "name")
      .addSelect("inventory.reference_inventory", "reference")
      .addSelect("SUM(order_details.quantity)", "total")
      .groupBy("inventory.id_inventory")
      .orderBy("total", "DESC")
      .limit(5)
      .getRawMany();

    // get solds by month (Enero, Febrero, Marzo, etc)
    const soldsByMonth = await this.db
      .createQueryBuilder("order")
      .select("MONTH(order.created_at)", "month")
      .addSelect("SUM(order.total_order)", "total")
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    const orderStats: IOrderStatsDto = {
      totalOrders,
      totalOrdersDelivered,
      totalOrdersPending,
      totalOrdersCanceled,
      totalOrdersInProcess,
      productsMostSold,
      soldsByMonth,
    };

    return orderStats;
  }

  async getOrderByReference(reference: string): Promise<Order[] | null> {
    const order = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.order_returns", "order_returns")
      .leftJoinAndSelect("order.order_details", "order_details")
      .leftJoinAndSelect("order_details.inventory", "inventory")
      .where("order.reference_order LIKE :reference", {
        reference: `%${reference}%`,
      })
      .limit(1000)
      .getMany();

    return order;
  }

  async getOrderAndOrderReturnsById(id: number): Promise<Order | null> {
    const order = await this.db
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.order_returns", "order_returns")
      .leftJoinAndSelect("order_returns.inventory", "inventory")
      .where("order.id_order = :id", { id })
      .getOne();

    if (order) {
      order.user.password_user = "";
    }

    return order;
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
      .limit(1000)
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
