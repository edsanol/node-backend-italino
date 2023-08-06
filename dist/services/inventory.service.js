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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.InventoryServiceImpl = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const add_inventory_model_1 = require("../domain/models/add-inventory.model");
let InventoryServiceImpl = class InventoryServiceImpl {
    constructor(inventoryRepository, userRepository) {
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }
    getInventoryStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.inventoryRepository.getInventoryStats();
            return response;
        });
    }
    getInventoriesByCategoryId(idCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventories = yield this.inventoryRepository.getInventoriesByCategoryId(idCategory);
            if (!inventories) {
                return null;
            }
            return inventories;
        });
    }
    updateInventoryFromApp(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield this.inventoryRepository.updateInventoryFromApp(inventory);
            if (!isUpdated) {
                throw new Error("Inventory not found");
            }
            return isUpdated;
        });
    }
    getInventoryByNameOrReference(nameOrReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = yield this.inventoryRepository.getInventoryByNameOrReference(nameOrReference);
            if (!inventory) {
                return null;
            }
            return inventory;
        });
    }
    getInventoryByIdAndAddInventory(idInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = yield this.inventoryRepository.getInventoryByIdAndAddInventory(idInventory);
            if (!inventory) {
                throw new Error("Inventory not found");
            }
            return inventory;
        });
    }
    addInventory(addInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingInventory = yield this.inventoryRepository.getInventoryById(addInventory.inventoryId);
            console.log("existingInventory", JSON.stringify(existingInventory, null, 2));
            const existingUser = yield this.userRepository.getUserById(addInventory.userId);
            if (!existingInventory || !existingUser) {
                throw new Error("Inventory or User not found");
            }
            const newAddInventory = new add_inventory_model_1.AddInventory();
            newAddInventory.inventory = existingInventory;
            newAddInventory.user = existingUser;
            newAddInventory.type = addInventory.type;
            newAddInventory.created_at = new Date();
            newAddInventory.updated_at = new Date();
            newAddInventory.quantity = addInventory.quantity;
            newAddInventory.detail = addInventory.detail;
            yield this.inventoryRepository.addInventory(newAddInventory);
            if (addInventory.type === "Salida") {
                existingInventory.stock_inventory -= addInventory.quantity;
                yield this.inventoryRepository.updateInventory(existingInventory);
            }
            else if (addInventory.type === "Entrada") {
                existingInventory.stock_inventory += addInventory.quantity;
                yield this.inventoryRepository.updateInventory(existingInventory);
            }
            else {
                throw new Error("Type not found");
            }
            const inventory = yield this.inventoryRepository.getInventoryById(addInventory.inventoryId);
            if (!inventory) {
                throw new Error("Inventory not found");
            }
            return inventory;
        });
    }
    createInventory(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInventory = yield this.inventoryRepository.createInventory(inventory);
            return newInventory;
        });
    }
    getAllInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            const allInventories = yield this.inventoryRepository.getAllInventories();
            return allInventories;
        });
    }
    getInventoryById(idInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventoryById = yield this.inventoryRepository.getInventoryById(idInventory);
            return inventoryById;
        });
    }
    updateInventory(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield this.inventoryRepository.updateInventory(inventory);
            return isUpdated;
        });
    }
    deleteInventory(idInventory) {
        const isDeleted = this.inventoryRepository.deleteInventory(idInventory);
        return isDeleted;
    }
};
InventoryServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.InventoryRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object, Object])
], InventoryServiceImpl);
exports.InventoryServiceImpl = InventoryServiceImpl;
