import { injectable } from "inversify";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { Inventory } from "../domain/models/inventory.model";
import { Category } from "../domain/models/category.model";
import { AppDataSource } from "../db";
import { Repository } from "typeorm";
import { IInventoryDto } from "../dto/inventoryDto";
import { IAddInventoryDto } from "dto/addInventoryDto";
import { AddInventory } from "../domain/models/add-inventory.model";
import { User } from "../domain/models/user.model";

@injectable()
export class InventoryRepositoryImpl implements InventoryRepositoryInterface {
  private readonly db: Repository<Inventory>;
  private readonly dbCategory: Repository<Category>;
  private readonly dbAddInventory: Repository<AddInventory>;

  constructor() {
    this.db = AppDataSource.getRepository(Inventory);
    this.dbCategory = AppDataSource.getRepository(Category);
    this.dbAddInventory = AppDataSource.getRepository(AddInventory);
  }

  async addInventory(adInventory: AddInventory): Promise<AddInventory> {
    return this.dbAddInventory.save(adInventory);
  }

  async createInventory(inventory: IInventoryDto): Promise<Inventory> {
    const category = await this.dbCategory.findOneByOrFail({
      id_category: inventory.categoryId,
    });

    const newInventory = new Inventory();
    newInventory.reference_inventory = inventory.referenceInventory;
    newInventory.name_inventory = inventory.nameInventory;
    newInventory.description_inventory = inventory.descriptionInventory;
    newInventory.stock_inventory = inventory.stockInventory;
    newInventory.status_inventory = inventory.statusInventory;
    newInventory.selling_price_inventory = inventory.sellingPriceInventory;
    newInventory.cost_price_inventory = inventory.costPriceInventory;
    newInventory.image_inventory = inventory.imageInventory;
    newInventory.publicated_inventory = inventory.publicatedInventory;
    newInventory.created_at = new Date();
    newInventory.updated_at = new Date();
    newInventory.category = category;

    return this.db.manager.save(newInventory);
  }
  async getAllInventories(): Promise<Inventory[] | null> {
    const allInventories = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
      .getMany();

    if (!allInventories) {
      return null;
    }

    return allInventories;
  }
  async getInventoryById(idInventory: number): Promise<Inventory | null> {
    const inventory = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
      .where("inventory.id_inventory = :idInventory", { idInventory })
      .getOne();

    if (!inventory) {
      return null;
    }

    return inventory;
  }
  async updateInventory(inventory: Inventory): Promise<boolean> {
    await this.db.manager.save(inventory);

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
