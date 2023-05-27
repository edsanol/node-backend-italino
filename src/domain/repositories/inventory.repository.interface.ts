import { Inventory } from "../models/inventory.model";

export interface InventoryRepositoryInterface {
  createInventory(inventory: Inventory): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(idInventory: number, inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
}
