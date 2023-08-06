import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";
import { IOrderDto } from "../../dto/orderDto";
import { Order } from "../../domain/models/order.model";

@injectable()
export class CreateReturnOrderUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(order: IOrderDto): Promise<Order> {
    const newOrder = await this.orderService.createOrderReturns(order);
    return newOrder;
  }
}
