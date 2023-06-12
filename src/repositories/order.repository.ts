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

  async createOrder(order: Order): Promise<Order> {
    return await this.db.manager.save(order);
  }
  async updateOrder(order: Order): Promise<Order> {
    return await this.db.manager.save(order);
  }
  async getOrderById(id: number): Promise<Order | null> {
    return await this.db.findOneByOrFail({ id_order: id });
  }
}
