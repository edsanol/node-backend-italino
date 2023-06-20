import { OrderDetail } from "../models/order-detail.model";

export interface OrderDetailRepositoryInterface {
  createManyOrderDetails(orderDetails: OrderDetail[]): Promise<OrderDetail[]>;
  getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]>;
}
