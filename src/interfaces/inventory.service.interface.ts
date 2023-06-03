import { Inventory } from "../domain/models/inventory.model";
import { IInventoryDto } from "../dto/inventoryDto";

export interface InventoryServiceInterface {
  createInventory(inventory: IInventoryDto): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(idInventory: number, inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
}
