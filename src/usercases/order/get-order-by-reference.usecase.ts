import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";

@injectable()
export class GetOrderByReferenceUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(reference: string) {
    const order = await this.orderService.getOrderByReference(reference);
    return order!;
  }
}
