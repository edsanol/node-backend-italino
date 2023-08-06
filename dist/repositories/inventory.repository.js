"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepositoryImpl = void 0;
const inversify_1 = require("inversify");
const inventory_model_1 = require("../domain/models/inventory.model");
const category_model_1 = require("../domain/models/category.model");
const db_1 = require("../db");
const add_inventory_model_1 = require("../domain/models/add-inventory.model");
let InventoryRepositoryImpl = class InventoryRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(inventory_model_1.Inventory);
        this.dbCategory = db_1.AppDataSource.getRepository(category_model_1.Category);
        this.dbAddInventory = db_1.AppDataSource.getRepository(add_inventory_model_1.AddInventory);
    }
    getInventoryStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalInventories = yield this.db.count();
            const activeInventories = yield this.db.count({
                where: { status_inventory: "Activo" },
            });
            const totalStock = yield this.db
                .createQueryBuilder("inventory")
                .select("SUM(inventory.stock_inventory)", "total_stock")
                .getRawOne();
            const inactiveInventories = yield this.db.count({
                where: { status_inventory: "Inactivo" },
            });
            const totalInventoriesPublished = yield this.db.count({
                where: { publicated_inventory: true },
            });
            const inventoryStats = {
                totalInventories,
                activeInventories,
                totalStock: Number(totalStock === null || totalStock === void 0 ? void 0 : totalStock.total_stock) || 0,
                inactiveInventories,
                totalInventoriesPublished,
            };
            return inventoryStats;
        });
    }
    getInventoriesByCategoryId(idCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getInventoriesByCategoryId");
            const inventories = yield this.db
                .createQueryBuilder("inventory")
                .leftJoinAndSelect("inventory.category", "category")
                .where("category.id_category = :idCategory", { idCategory })
                .getMany();
            if (!inventories) {
                return null;
            }
            return inventories;
        });
    }
    updateInventoryFromApp(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("updateInventoryFromApp");
            const category = yield this.dbCategory.findOneByOrFail({
                id_category: inventory.categoryId,
            });
            const inventoryToUpdate = yield this.db.findOneByOrFail({
                id_inventory: inventory.id,
            });
            inventoryToUpdate.id_inventory = inventory.id;
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
            yield this.db.save(inventoryToUpdate);
            const inventoryUpdated = yield this.db.findOneByOrFail({
                id_inventory: inventory.id,
            });
            return inventoryUpdated;
        });
    }
    getInventoryByNameOrReference(nameOrReference) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getInventoryByNameOrReference");
            const inventory = yield this.db
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
        });
    }
    getInventoryByIdAndAddInventory(idInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getInventoryByIdAndAddInventory");
            const inventory = yield this.db
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
        });
    }
    addInventory(adInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("addInventory");
            return this.dbAddInventory.save(adInventory);
        });
    }
    createInventory(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createInventory");
            const category = yield this.dbCategory.findOneByOrFail({
                id_category: inventory.categoryId,
            });
            const newInventory = new inventory_model_1.Inventory();
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
        });
    }
    getAllInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAllInventories");
            const allInventories = yield this.db
                .createQueryBuilder("inventory")
                .leftJoinAndSelect("inventory.category", "category")
                .leftJoinAndSelect("inventory.add_inventory", "add_inventory")
                .limit(50)
                .getMany();
            if (!allInventories) {
                return null;
            }
            return allInventories;
        });
    }
    getInventoryById(idInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getInventoryById");
            const inventory = yield this.db
                .createQueryBuilder("inventory")
                .leftJoinAndSelect("inventory.category", "category")
                .where("inventory.id_inventory = :idInventory", { idInventory })
                .getOne();
            if (!inventory) {
                return null;
            }
            return inventory;
        });
    }
    updateInventory(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("updateInventory");
            yield this.db.manager.save(inventory);
            return Promise.resolve(true);
        });
    }
    deleteInventory(idInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("deleteInventory");
            const inventoryToDelete = yield this.db.findOneBy({
                id_inventory: idInventory,
            });
            if (!inventoryToDelete) {
                return false;
            }
            yield this.db.manager.remove(inventoryToDelete);
            return Promise.resolve(true);
        });
    }
};
InventoryRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], InventoryRepositoryImpl);
exports.InventoryRepositoryImpl = InventoryRepositoryImpl;
