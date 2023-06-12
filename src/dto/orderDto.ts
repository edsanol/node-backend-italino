import { IOrderDetailDto } from "./orderDetailDto";

export interface IOrderDto {
  idOrder?: number;
  customerId: number;
  userId: number;
  statusOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderDetails: IOrderDetailDto[];
}
