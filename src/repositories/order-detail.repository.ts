import { OrderDetailRepositoryInterface } from "../domain/repositories/order-detail.repository.interface";
import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { OrderDetail } from "../domain/models/order-detail.model";
import { Inventory } from "../domain/models/inventory.model";

@injectable()
export class OrderDetailRepositoryImpl
  implements OrderDetailRepositoryInterface
{
  private readonly db: Repository<OrderDetail>;

  constructor() {
    this.db = AppDataSource.getRepository(OrderDetail);
  }

  async getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]> {
    const orderDetails = await this.db
      .createQueryBuilder("orderDetail")
      .leftJoinAndSelect("orderDetail.inventory", "inventory")
      .where("orderDetail.order.id_order = :orderId", { orderId })
      .getMany();

    return orderDetails;
  }

  async createManyOrderDetails(
    orderDetails: OrderDetail[]
  ): Promise<OrderDetail[]> {
    return await this.db.manager.save(orderDetails);
  }
}
