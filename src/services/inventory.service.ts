import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../interfaces/inventory.service.interface";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { TYPES } from "../config/types";
import { Inventory } from "domain/models/inventory.model";
import { IInventoryDto } from "../dto/inventoryDto";

@injectable()
export class InventoryServiceImpl implements InventoryServiceInterface {
  constructor(
    @inject(TYPES.InventoryRepository)
    private inventoryRepository: InventoryRepositoryInterface
  ) {}
  async createInventory(inventory: IInventoryDto): Promise<Inventory> {
    const newInventory = await this.inventoryRepository.createInventory(
      inventory
    );
    return newInventory;
  }
  async getAllInventories(): Promise<Inventory[] | null> {
    const allInventories = await this.inventoryRepository.getAllInventories();
    return allInventories;
  }
  async getInventoryById(idInventory: number): Promise<Inventory | null> {
    const inventoryById = await this.inventoryRepository.getInventoryById(
      idInventory
    );
    return inventoryById;
  }
  async updateInventory(
    idInventory: number,
    inventory: Inventory
  ): Promise<boolean> {
    const isUpdated = await this.inventoryRepository.updateInventory(
      idInventory,
      inventory
    );
    return isUpdated;
  }
  deleteInventory(idInventory: number): Promise<boolean> {
    const isDeleted = this.inventoryRepository.deleteInventory(idInventory);
    return isDeleted;
  }
}
