export interface IOrderDetailDto {
  idOrderDetail?: number;
  inventoryId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderId?: number;
}
