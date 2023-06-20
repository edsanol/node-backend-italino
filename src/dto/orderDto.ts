import { IOrderDetailDto } from "./orderDetailDto";
import { IOrderReturnDto } from "./orderReturnDto";

export interface IOrderDto {
  id?: number;
  customerId: number;
  userId: number;
  statusOrder: string;
  paymentOrder: string;
  typeOrder: string;
  totalOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderDetails: IOrderDetailDto[];
  OrderReturns?: IOrderReturnDto[];
}
