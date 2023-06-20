import { injectable } from "inversify";
import { OrderReturnRepositoryInterface } from "../domain/repositories/order-return.respository.interface";
import { Repository } from "typeorm";
import { OrderReturn } from "../domain/models/order-return.model";
import { AppDataSource } from "../db";

@injectable()
export class OrderReturnRepositoryImpl
  implements OrderReturnRepositoryInterface
{
  private readonly db: Repository<OrderReturn>;

  constructor() {
    this.db = AppDataSource.getRepository(OrderReturn);
  }

  async createManyOrderReturns(
    orderReturns: OrderReturn[]
  ): Promise<OrderReturn[]> {
    return await this.db.manager.save(orderReturns);
  }
}
