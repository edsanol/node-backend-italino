export interface IOrderReturnDto {
  idOrderReturn?: number;
  inventoryId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderId?: number;
}
