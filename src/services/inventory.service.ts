import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../interfaces/inventory.service.interface";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { TYPES } from "../config/types";
import { Inventory } from "domain/models/inventory.model";
import { IInventoryDto } from "../dto/inventoryDto";
import { IAddInventoryDto } from "dto/addInventoryDto";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { AddInventory } from "../domain/models/add-inventory.model";

@injectable()
export class InventoryServiceImpl implements InventoryServiceInterface {
  constructor(
    @inject(TYPES.InventoryRepository)
    private inventoryRepository: InventoryRepositoryInterface,
    @inject(TYPES.UserRepository)
    private userRepository: UserRepositoryInterface
  ) {}

  async addInventory(addInventory: IAddInventoryDto): Promise<Inventory> {
    const existingInventory = await this.inventoryRepository.getInventoryById(
      addInventory.inventoryId
    );

    const existingUser = await this.userRepository.getUserById(
      addInventory.userId
    );

    if (!existingInventory || !existingUser) {
      throw new Error("Inventory or User not found");
    }

    const newAddInventory = new AddInventory();
    newAddInventory.inventory = existingInventory;
    newAddInventory.user = existingUser;
    newAddInventory.type = addInventory.type;
    newAddInventory.created_at = new Date();
    newAddInventory.updated_at = new Date();
    newAddInventory.quantity = addInventory.quantity;
    newAddInventory.detail = addInventory.detail;

    await this.inventoryRepository.addInventory(newAddInventory);

    if (addInventory.type === "Salida") {
      existingInventory.stock_inventory -= addInventory.quantity;
      await this.inventoryRepository.updateInventory(existingInventory);
    } else if (addInventory.type === "Entrada") {
      existingInventory.stock_inventory += addInventory.quantity;
      await this.inventoryRepository.updateInventory(existingInventory);
    } else {
      throw new Error("Type not found");
    }

    const inventory = await this.inventoryRepository.getInventoryById(
      addInventory.inventoryId
    );

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    return inventory;
  }
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
  async updateInventory(inventory: Inventory): Promise<boolean> {
    const isUpdated = await this.inventoryRepository.updateInventory(inventory);
    return isUpdated;
  }
  deleteInventory(idInventory: number): Promise<boolean> {
    const isDeleted = this.inventoryRepository.deleteInventory(idInventory);
    return isDeleted;
  }
}
