import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";

@injectable()
export class GetOrderStatsUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute() {
    const orderStats = await this.orderService.getOrderInfo();
    return orderStats!;
  }
}
