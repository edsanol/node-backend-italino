import { injectable } from "inversify";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { Inventory } from "../domain/models/inventory.model";
import { Category } from "../domain/models/category.model";
import { AppDataSource } from "../db";
import { Repository } from "typeorm";
import { IInventoryDto } from "../dto/inventoryDto";

@injectable()
export class InventoryRepositoryImpl implements InventoryRepositoryInterface {
  private readonly db: Repository<Inventory>;
  private readonly dbCategory: Repository<Category>;

  constructor() {
    this.db = AppDataSource.getRepository(Inventory);
    this.dbCategory = AppDataSource.getRepository(Category);
  }
  async createInventory(inventory: IInventoryDto): Promise<Inventory> {
    const category = await this.dbCategory.findOneByOrFail({
      id_category: inventory.categoryId,
    });

    const newInventory = new Inventory();
    newInventory.reference_inventory = inventory.inventoryReference;
    newInventory.name_inventory = inventory.inventoryName;
    newInventory.description_inventory = inventory.inventoryDescription;
    newInventory.stock_inventory = inventory.inventoryStock;
    newInventory.status_inventory = inventory.inventoryStatus;
    newInventory.selling_price_inventory = inventory.inventorySellingPrice;
    newInventory.cost_price_inventory = inventory.inventoryCostPrice;
    newInventory.image_inventory = inventory.inventoryImage;
    newInventory.publicated_inventory = inventory.inventoryPublicated;
    newInventory.created_at = new Date();
    newInventory.updated_at = new Date();
    newInventory.category = category;

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
