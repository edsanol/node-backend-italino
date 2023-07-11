import { Order } from "../models/order.model";
import { IOrderStatsDto } from "../../dto/orderStatsDto";

export interface OrderRepositoryInterface {
  createOrder(order: Order): Promise<Order>;
  createOrderReturns(order: Order): Promise<Order>;
  updateOrder(order: Order): Promise<Order>;
  getOrderById(id: number): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  getOrderAndOrderReturnsById(id: number): Promise<Order | null>;
  getOrderByReference(reference: string): Promise<Order[] | null>;
  getOrderInfo(): Promise<IOrderStatsDto>;
  getOrderProduction(): Promise<Order[]>;
}
