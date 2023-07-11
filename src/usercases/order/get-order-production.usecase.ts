import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";

@injectable()
export class GetOrderProductionUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute() {
    const orderProduction = await this.orderService.getOrderProduction();
    return orderProduction!;
  }
}
