import { Inventory } from "../domain/models/inventory.model";
import { IInventoryDto } from "../dto/inventoryDto";
import { IAddInventoryDto } from "../dto/addInventoryDto";
import { IInventoryStatsDto } from "../dto/inventoryStatsDto";

export interface InventoryServiceInterface {
  createInventory(inventory: IInventoryDto): Promise<Inventory>;
  getAllInventories(): Promise<Inventory[] | null>;
  getInventoryById(idInventory: number): Promise<Inventory | null>;
  updateInventory(inventory: Inventory): Promise<boolean>;
  deleteInventory(idInventory: number): Promise<boolean>;
  addInventory(addInventory: IAddInventoryDto): Promise<Inventory>;
  getInventoryByIdAndAddInventory(idInventory: number): Promise<Inventory>;
  getInventoryByNameOrReference(
    nameOrReference: string
  ): Promise<Inventory[] | null>;
  updateInventoryFromApp(inventory: IInventoryDto): Promise<Inventory>;
  getInventoriesByCategoryId(idCategory: number): Promise<Inventory[] | null>;
  getInventoryStats(): Promise<IInventoryStatsDto>;
}
