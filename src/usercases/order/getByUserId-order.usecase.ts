import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";
import { Order } from "../../domain/models/order.model";

@injectable()
export class GetAllOrdersByUserIdUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(userId: number): Promise<Order[]> {
    const orders = await this.orderService.getOrdersByUserId(userId);
    return orders;
  }
}
