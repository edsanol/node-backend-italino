import { OrderReturn } from "../models/order-return.model";

export interface OrderReturnRepositoryInterface {
  createManyOrderReturns(orderReturns: OrderReturn[]): Promise<OrderReturn[]>;
}
