import { Inventory } from "../models/inventory.model";
import { IInventoryDto } from "../../dto/inventoryDto";
import { AddInventory } from "../models/add-inventory.model";

export interface InventoryRepositoryInterface {
  createInventory(inventory: IInventoryDto): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
  addInventory(adInventory: AddInventory): Promise<AddInventory>;
}
