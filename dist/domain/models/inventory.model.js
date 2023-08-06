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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const category_model_1 = require("./category.model");
const order_detail_model_1 = require("./order-detail.model");
const order_return_model_1 = require("./order-return.model");
const add_inventory_model_1 = require("./add-inventory.model");
let Inventory = class Inventory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory.prototype, "id_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Inventory.prototype, "reference_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Inventory.prototype, "name_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 220 }),
    __metadata("design:type", String)
], Inventory.prototype, "description_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventory.prototype, "stock_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Inventory.prototype, "status_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventory.prototype, "selling_price_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventory.prototype, "cost_price_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 600 }),
    __metadata("design:type", String)
], Inventory.prototype, "image_inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Inventory.prototype, "publicated_inventory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Inventory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Inventory.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_model_1.Category, (category) => category.inventory),
    (0, typeorm_1.JoinColumn)({ name: "id_category" }),
    __metadata("design:type", category_model_1.Category)
], Inventory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_model_1.OrderDetail, (order_detail) => order_detail.inventory),
    __metadata("design:type", Array)
], Inventory.prototype, "order_details", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_return_model_1.OrderReturn, (order_returns) => order_returns.inventory),
    __metadata("design:type", Array)
], Inventory.prototype, "order_returns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => add_inventory_model_1.AddInventory, (add_inventory) => add_inventory.inventory),
    __metadata("design:type", Array)
], Inventory.prototype, "add_inventory", void 0);
Inventory = __decorate([
    (0, typeorm_1.Entity)()
], Inventory);
exports.Inventory = Inventory;
