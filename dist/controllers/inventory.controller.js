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
exports.InventoryController = void 0;
const inversify_1 = require("inversify");
const create_inventory_usecase_1 = require("../usercases/inventory/create-inventory.usecase");
const types_1 = require("../config/types");
const getall_inventory_usecase_1 = require("../usercases/inventory/getall-inventory.usecase");
const get_inventory_usecase_1 = require("../usercases/inventory/get-inventory.usecase");
const update_inventory_usecase_1 = require("../usercases/inventory/update-inventory.usecase");
const delete_inventory_usecase_1 = require("../usercases/inventory/delete-inventory.usecase");
const add_inventory_usecase_1 = require("../usercases/inventory/add-inventory.usecase");
const get_inventory_add_usecase_1 = require("../usercases/inventory/get-inventory-add.usecase");
const get_inventory_by_name_or_reference_usecase_1 = require("../usercases/inventory/get-inventory-by-name-or-reference.usecase");
const update_inventory_app_usecase_1 = require("../usercases/inventory/update-inventory-app.usecase");
const get_inventories_by_category_id_usecase_1 = require("../usercases/inventory/get-inventories-by-category-id.usecase");
const get_inventory_stats_usecase_1 = require("../usercases/inventory/get-inventory-stats.usecase");
let InventoryController = class InventoryController {
    constructor(createInventoryUseCase, getAllInventoriesUseCase, getInventoryUseCase, updateInventoryUseCase, deleteInventoryUseCase, addInventoryUseCase, getInventoryByIdAndAddUseCase, getInventoryByNameOrReferenceUseCase, updateInventoryFromAppUseCase, getInventoriesByCategoryIdUseCase, getInventoryStatsUseCase) {
        this.createInventoryUseCase = createInventoryUseCase;
        this.getAllInventoriesUseCase = getAllInventoriesUseCase;
        this.getInventoryUseCase = getInventoryUseCase;
        this.updateInventoryUseCase = updateInventoryUseCase;
        this.deleteInventoryUseCase = deleteInventoryUseCase;
        this.addInventoryUseCase = addInventoryUseCase;
        this.getInventoryByIdAndAddUseCase = getInventoryByIdAndAddUseCase;
        this.getInventoryByNameOrReferenceUseCase = getInventoryByNameOrReferenceUseCase;
        this.updateInventoryFromAppUseCase = updateInventoryFromAppUseCase;
        this.getInventoriesByCategoryIdUseCase = getInventoriesByCategoryIdUseCase;
        this.getInventoryStatsUseCase = getInventoryStatsUseCase;
    }
    createInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const inventory = req.body;
                const newInventory = yield this.createInventoryUseCase.execute(inventory);
                res.status(201).json({
                    success: true,
                    message: "Inventory created successfully",
                    data: newInventory,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating inventory",
                    error: error.message,
                });
            }
        });
    }
    getAllInventories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventories = yield this.getAllInventoriesUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: "Inventories retrieved successfully",
                    data: inventories,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving inventories",
                    error: error.message,
                });
            }
        });
    }
    getInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const inventoryId = Number(req.params.inventoryId);
                const inventory = yield this.getInventoryUseCase.execute(inventoryId);
                if (inventory) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory retrieved successfully",
                        data: inventory,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        data: null,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving inventory",
                    error: error.message,
                });
            }
        });
    }
    updateInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const data = req.body;
                const isUpdated = yield this.updateInventoryUseCase.execute(data);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory updated successfully",
                        data: true,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error updating inventory",
                    error: error.message,
                });
            }
        });
    }
    deleteInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const inventoryId = Number(req.params.inventoryId);
                const isDeleted = yield this.deleteInventoryUseCase.execute(inventoryId);
                if (isDeleted) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory deleted successfully",
                        data: true,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error deleting inventory",
                    error: error.message,
                });
            }
        });
    }
    addInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const request = req.body;
                const isAdded = yield this.addInventoryUseCase.execute(request);
                if (isAdded) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory added successfully",
                        data: isAdded,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error adding inventory",
                    error: error.message,
                });
            }
        });
    }
    getInventoryByIdAndAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const inventoryId = Number(req.params.inventoryId);
                const inventory = yield this.getInventoryByIdAndAddUseCase.execute(inventoryId);
                if (inventory) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory added successfully",
                        data: inventory,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error getting inventory",
                    error: error.message,
                });
            }
        });
    }
    getInventoryByNameOrReference(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const request = req.params.nameOrReference;
                console.log("request", request);
                const inventory = yield this.getInventoryByNameOrReferenceUseCase.execute(request);
                if (inventory) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory retrieved successfully",
                        data: inventory,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving inventory",
                    error: error.message,
                });
            }
        });
    }
    updateInventoryFromApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const request = req.body;
                const isUpdated = yield this.updateInventoryFromAppUseCase.execute(request);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory updated successfully",
                        data: isUpdated,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error updating inventory",
                    error: error.message,
                });
            }
        });
    }
    getInventoriesByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const categoryId = Number(req.params.categoryId);
                const inventory = yield this.getInventoriesByCategoryIdUseCase.execute(categoryId);
                if (inventory) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory retrieved successfully",
                        data: inventory,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory not found",
                        error: "Inventory not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving inventory",
                    error: error.message,
                });
            }
        });
    }
    getInventoryStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const stats = yield this.getInventoryStatsUseCase.execute();
                if (stats) {
                    res.status(200).json({
                        success: true,
                        message: "Inventory stats retrieved successfully",
                        data: stats,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Inventory stats not found",
                        error: "Inventory stats not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving inventory stats",
                    error: error.message,
                });
            }
        });
    }
};
InventoryController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateInventoryUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllInventoriesUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetInventoryUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UpdateInventoryUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DeleteInventoryUseCase)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.AddInventoryUseCase)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.GetInventoryByIdAndAddUseCase)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.GetInventoryByNameOrReferenceUseCase)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.UpdateInventoryFromAppUseCase)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.GetInventoriesByCategoryIdUseCase)),
    __param(10, (0, inversify_1.inject)(types_1.TYPES.GetInventoryStatsUseCase)),
    __metadata("design:paramtypes", [create_inventory_usecase_1.CreateInventoryUseCase,
        getall_inventory_usecase_1.GetAllInventoriesUseCase,
        get_inventory_usecase_1.GetInventoryUseCase,
        update_inventory_usecase_1.UpdateInventoryUseCase,
        delete_inventory_usecase_1.DeleteInventoryUseCase,
        add_inventory_usecase_1.AddInventoryUseCase,
        get_inventory_add_usecase_1.GetInventoryByIdAndAddUseCase,
        get_inventory_by_name_or_reference_usecase_1.GetInventoryByNameOrReferenceUseCase,
        update_inventory_app_usecase_1.UpdateInventoryFromAppUseCase,
        get_inventories_by_category_id_usecase_1.GetInventoriesByCategoryIdUseCase,
        get_inventory_stats_usecase_1.GetInventoryStatsUseCase])
], InventoryController);
exports.InventoryController = InventoryController;
