import { injectable } from "inversify";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { Inventory } from "../domain/models/inventory.model";
import { AppDataSource } from "../db";
import { Repository } from "typeorm";

@injectable()
export class InventoryRepositoryImpl implements InventoryRepositoryInterface {
  private readonly db: Repository<Inventory>;

  constructor() {
    this.db = AppDataSource.getRepository(Inventory);
  }
  async createInventory(inventory: Inventory): Promise<Inventory> {
    const newInventory = new Inventory();
    newInventory.reference_inventory = inventory.reference_inventory;
    newInventory.name_inventory = inventory.name_inventory;
    newInventory.id_category = inventory.id_category;
    newInventory.description_inventory = inventory.description_inventory;
    newInventory.stock_inventory = inventory.stock_inventory;
    newInventory.status_inventory = inventory.status_inventory;
    newInventory.selling_price_inventory = inventory.selling_price_inventory;
    newInventory.cost_price_inventory = inventory.cost_price_inventory;
    newInventory.image_inventory = inventory.image_inventory;
    newInventory.publicated_inventory = inventory.publicated_inventory;
    newInventory.created_at = new Date();
    newInventory.updated_at = new Date();

    return this.db.manager.save(newInventory);
  }
  async getAllInventories(): Promise<Inventory[] | null> {
    const allInventories = await this.db.find();

    if (!allInventories) {
      return null;
    }

    return allInventories;
  }
  async getInventoryById(idInventory: number): Promise<Inventory | null> {
    const inventoryById = await this.db.findOneBy({
      id_inventory: idInventory,
    });

    if (!inventoryById) {
      return null;
    }

    return inventoryById;
  }
  async updateInventory(
    idInventory: number,
    inventory: Inventory
  ): Promise<boolean> {
    const inventoryToUpdate = this.db.findOneBy({ id_inventory: idInventory });

    if (!inventoryToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...inventoryToUpdate, ...inventory });

    return Promise.resolve(true);
  }
  async deleteInventory(idInventory: number): Promise<boolean> {
    const inventoryToDelete = await this.db.findOneBy({
      id_inventory: idInventory,
    });

    if (!inventoryToDelete) {
      return false;
    }

    await this.db.manager.remove(inventoryToDelete);

    return Promise.resolve(true);
  }
}
