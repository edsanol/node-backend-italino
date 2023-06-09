import { Inventory } from "../models/inventory.model";
import { IInventoryDto } from "../../dto/inventoryDto";
import { AddInventory } from "../models/add-inventory.model";
import { IInventoryStatsDto } from "../../dto/inventoryStatsDto";

export interface InventoryRepositoryInterface {
  createInventory(inventory: IInventoryDto): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
  addInventory(adInventory: AddInventory): Promise<AddInventory>;
  getInventoryByIdAndAddInventory(idInventory: number): Promise<Inventory>;
  getInventoryByNameOrReference(
    nameOrReference: string
  ): Promise<Inventory[] | null>;
  updateInventoryFromApp(inventory: IInventoryDto): Promise<Inventory>;
  getInventoriesByCategoryId(idCategory: number): Promise<Inventory[] | null>;
  getInventoryStats(): Promise<IInventoryStatsDto>;
}
