export interface IInventoryDto {
  inventoryId?: number;
  inventoryReference: string;
  inventoryName: string;
  inventoryDescription: string;
  inventoryStock: number;
  inventoryStatus: string;
  inventorySellingPrice: number;
  inventoryCostPrice: number;
  inventoryImage: string;
  inventoryPublicated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: number;
}
