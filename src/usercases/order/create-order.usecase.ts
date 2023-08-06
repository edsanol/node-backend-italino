import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";
import { Order } from "../../domain/models/order.model";
import { IOrderDto } from "../../dto/orderDto";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(order: IOrderDto): Promise<Order> {
    const newOrder = await this.orderService.createOrder(order);
    return newOrder;
  }
}
