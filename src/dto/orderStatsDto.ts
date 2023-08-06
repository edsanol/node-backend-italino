import { IProductMostSoldDto } from "./IProductMostSoldDto";
import { ISoldByMonth } from "./soldByMonth";

export interface IOrderStatsDto {
  totalOrders: number;
  totalOrdersDelivered: number;
  totalOrdersPending: number;
  totalOrdersCanceled: number;
  totalOrdersInProcess: number;
  productsMostSold: IProductMostSoldDto[];
  soldsByMonth: ISoldByMonth[];
}
