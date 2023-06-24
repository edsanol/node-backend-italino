import { Order } from "../models/order.model";

export interface OrderRepositoryInterface {
  createOrder(order: Order): Promise<Order>;
  createOrderReturns(order: Order): Promise<Order>;
  updateOrder(order: Order): Promise<Order>;
  getOrderById(id: number): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  getOrderAndOrderReturnsById(id: number): Promise<Order | null>;
  getOrderByReference(reference: string): Promise<Order[] | null>;
}
