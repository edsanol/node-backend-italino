import { Order } from "../domain/models/order.model";
import { IOrderDto } from "../dto/orderDto";

export interface OrderServiceInterface {
  createOrder(order: IOrderDto): Promise<Order>;
  updateOrder(order: Order): Promise<Order>;
  getOrderById(id: number): Promise<Order | null>;
}
