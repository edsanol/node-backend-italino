import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";

@injectable()
export class GetOrderAndReturnByIdUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(id: number) {
    const order = await this.orderService.getOrderAndOrderReturnsById(id);
    return order!;
  }
}
