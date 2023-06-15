import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { OrderServiceInterface } from "../../interfaces/order.service.interface";
import { IOrderDto } from "../../dto/orderDto";

@injectable()
export class UpdateOrderUseCase {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderServiceInterface
  ) {}

  async execute(order: IOrderDto): Promise<any> {
    const updatedOrder = await this.orderService.updateOrder(order);
    return updatedOrder;
  }
}
