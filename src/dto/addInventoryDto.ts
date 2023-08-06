export interface IAddInventoryDto {
  addInventoryId?: number;
  inventoryId: number;
  userId: number;
  quantity: number;
  detail: string;
  type: string;
}
