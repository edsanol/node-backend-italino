import { injectable } from "inversify";
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { Inventory } from "../domain/models/inventory.model";
import { Category } from "../domain/models/category.model";
import { AppDataSource } from "../db";
import { Repository } from "typeorm";
import { IInventoryDto } from "../dto/inventoryDto";
import { AddInventory } from "../domain/models/add-inventory.model";
import { IInventoryStatsDto } from "dto/inventoryStatsDto";

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

  async getInventoryStats(): Promise<IInventoryStatsDto> {
    const totalInventories = await this.db.count();
    const activeInventories = await this.db.count({
      where: { status_inventory: "Activo" },
    });
    const totalStock = await this.db
      .createQueryBuilder("inventory")
      .select("SUM(inventory.stock_inventory)", "total_stock")
      .getRawOne();
    const inactiveInventories = await this.db.count({
      where: { status_inventory: "Inactivo" },
    });
    const totalInventoriesPublished = await this.db.count({
      where: { publicated_inventory: true },
    });
    const inventoryStats: IInventoryStatsDto = {
      totalInventories,
      activeInventories,
      totalStock: Number(totalStock?.total_stock!) || 0,
      inactiveInventories,
      totalInventoriesPublished,
    };

    return inventoryStats;
  }

  async getInventoriesByCategoryId(
    idCategory: number
  ): Promise<Inventory[] | null> {
    console.log("getInventoriesByCategoryId");
    const inventories = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .where("category.id_category = :idCategory", { idCategory })
      .getMany();

    if (!inventories) {
      return null;
    }

    return inventories;
  }

  async updateInventoryFromApp(inventory: IInventoryDto): Promise<Inventory> {
    console.log("updateInventoryFromApp");
    const category = await this.dbCategory.findOneByOrFail({
      id_category: inventory.categoryId,
    });

    const inventoryToUpdate = await this.db.findOneByOrFail({
      id_inventory: inventory.id,
    });

    inventoryToUpdate.id_inventory = inventory.id!;
    inventoryToUpdate.reference_inventory = inventory.referenceInventory;
    inventoryToUpdate.name_inventory = inventory.nameInventory;
    inventoryToUpdate.description_inventory = inventory.descriptionInventory;
    inventoryToUpdate.stock_inventory = inventory.stockInventory;
    inventoryToUpdate.status_inventory = inventory.statusInventory;
    inventoryToUpdate.selling_price_inventory = inventory.sellingPriceInventory;
    inventoryToUpdate.cost_price_inventory = inventory.costPriceInventory;
    inventoryToUpdate.image_inventory = inventory.imageInventory;
    inventoryToUpdate.publicated_inventory = inventory.publicatedInventory;
    inventoryToUpdate.updated_at = new Date();
    inventoryToUpdate.category = category;

    await this.db.save(inventoryToUpdate);

    const inventoryUpdated = await this.db.findOneByOrFail({
      id_inventory: inventory.id,
    });

    return inventoryUpdated;
  }

  async getInventoryByNameOrReference(
    nameOrReference: string
  ): Promise<Inventory[] | null> {
    console.log("getInventoryByNameOrReference");
    const inventory = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
      .where("inventory.name_inventory LIKE :nameOrReference", {
        nameOrReference: `%${nameOrReference}%`,
      })
      .orWhere("inventory.reference_inventory LIKE :nameOrReference", {
        nameOrReference: `%${nameOrReference}%`,
      })
      .limit(50)
      .getMany();

    if (!inventory) {
      return null;
    }

    return inventory;
  }

  async getInventoryByIdAndAddInventory(
    idInventory: number
  ): Promise<Inventory> {
    console.log("getInventoryByIdAndAddInventory");
    const inventory = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
      .leftJoinAndSelect("add_inventory.user", "user")
      .where("inventory.id_inventory = :idInventory", { idInventory })
      .getOne();

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    return inventory;
  }

  async addInventory(adInventory: AddInventory): Promise<AddInventory> {
    console.log("addInventory");
    return this.dbAddInventory.save(adInventory);
  }

  async createInventory(inventory: IInventoryDto): Promise<Inventory> {
    console.log("createInventory");
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
    console.log("getAllInventories");
    const allInventories = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
      .limit(50)
      .getMany();

    if (!allInventories) {
      return null;
    }

    return allInventories;
  }
  async getInventoryById(idInventory: number): Promise<Inventory | null> {
    console.log("getInventoryById");
    const inventory = await this.db
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.category", "category")
      .where("inventory.id_inventory = :idInventory", { idInventory })
      .getOne();

    if (!inventory) {
      return null;
    }

    return inventory;
  }
  async updateInventory(inventory: Inventory): Promise<boolean> {
    console.log("updateInventory");
    await this.db.manager.save(inventory);

    return Promise.resolve(true);
  }
  async deleteInventory(idInventory: number): Promise<boolean> {
    console.log("deleteInventory");
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
