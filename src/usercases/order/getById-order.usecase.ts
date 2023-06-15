import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";
import { Order } from "../../domain/models/order.model";

@injectable()
export class GetOrderByIdUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(id: number): Promise<Order> {
    const order = await this.orderService.getOrderById(id);
    return order!;
  }
}
