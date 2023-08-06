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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const inventory_controller_1 = require("../controllers/inventory.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let InventoryRoutes = class InventoryRoutes {
    constructor(inventoryController) {
        this.inventoryController = inventoryController;
    }
    configureRoutes(router) {
        router.post("/inventories", validate_jwt_1.validateJWT, this.inventoryController.createInventory.bind(this.inventoryController));
        router.get("/inventories", this.inventoryController.getAllInventories.bind(this.inventoryController));
        router.get("/inventories/:inventoryId", validate_jwt_1.validateJWT, this.inventoryController.getInventory.bind(this.inventoryController));
        router.put("/inventories", validate_jwt_1.validateJWT, this.inventoryController.updateInventory.bind(this.inventoryController));
        router.delete("/inventories/:inventoryId", validate_jwt_1.validateJWT, this.inventoryController.deleteInventory.bind(this.inventoryController));
        router.post("/inventories/add", validate_jwt_1.validateJWT, this.inventoryController.addInventory.bind(this.inventoryController));
        router.get("/inventories/add/:inventoryId", validate_jwt_1.validateJWT, this.inventoryController.getInventoryByIdAndAdd.bind(this.inventoryController));
        router.get("/inventories/search/:nameOrReference", validate_jwt_1.validateJWT, this.inventoryController.getInventoryByNameOrReference.bind(this.inventoryController));
        router.put("/inventories/app", validate_jwt_1.validateJWT, this.inventoryController.updateInventoryFromApp.bind(this.inventoryController));
        router.get("/inventories/category/:categoryId", validate_jwt_1.validateJWT, this.inventoryController.getInventoriesByCategoryId.bind(this.inventoryController));
        router.get("/inventories-stats/stats", validate_jwt_1.validateJWT, this.inventoryController.getInventoryStats.bind(this.inventoryController));
    }
};
InventoryRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.InventoryController)),
    __metadata("design:paramtypes", [inventory_controller_1.InventoryController])
], InventoryRoutes);
exports.InventoryRoutes = InventoryRoutes;
