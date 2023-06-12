import { Inventory } from "../models/inventory.model";
import { IInventoryDto } from "../../dto/inventoryDto";

export interface InventoryRepositoryInterface {
  createInventory(inventory: IInventoryDto): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
}
