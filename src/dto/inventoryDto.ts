export interface IInventoryDto {
  id?: number;
  referenceInventory: string;
  nameInventory: string;
  descriptionInventory: string;
  stockInventory: number;
  statusInventory: string;
  sellingPriceInventory: number;
  costPriceInventory: number;
  imageInventory: string;
  publicatedInventory: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: number;
}
