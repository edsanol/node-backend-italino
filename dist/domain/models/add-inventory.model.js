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
exports.AddInventory = void 0;
const typeorm_1 = require("typeorm");
const inventory_model_1 = require("./inventory.model");
const user_model_1 = require("./user.model");
let AddInventory = class AddInventory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AddInventory.prototype, "id_add_inventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_model_1.Inventory, (inventory) => inventory.add_inventory, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "id_inventory" }),
    __metadata("design:type", inventory_model_1.Inventory)
], AddInventory.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.add_inventory),
    __metadata("design:type", user_model_1.User)
], AddInventory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AddInventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddInventory.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddInventory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AddInventory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AddInventory.prototype, "updated_at", void 0);
AddInventory = __decorate([
    (0, typeorm_1.Entity)()
], AddInventory);
exports.AddInventory = AddInventory;
