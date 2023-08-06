import { Order } from "../domain/models/order.model";
import { IOrderDto } from "../dto/orderDto";
import { IOrderStatsDto } from "../dto/orderStatsDto";

export interface OrderServiceInterface {
  createOrder(order: IOrderDto): Promise<Order>;
  createOrderReturns(order: IOrderDto): Promise<Order>;
  updateOrder(order: IOrderDto): Promise<Order>;
  getOrderById(id: number): Promise<Order | null>;
  getOrderById(id: number): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  getOrderAndOrderReturnsById(id: number): Promise<Order | null>;
  getOrderByReference(reference: string): Promise<Order[] | null>;
  getOrderInfo(): Promise<IOrderStatsDto>;
  getOrderProduction(): Promise<Order[]>;
}
