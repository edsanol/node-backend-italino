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
exports.OrderReturn = void 0;
const typeorm_1 = require("typeorm");
const inventory_model_1 = require("./inventory.model");
const order_model_1 = require("./order.model");
let OrderReturn = class OrderReturn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderReturn.prototype, "id_order_return", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_model_1.Inventory, (inventory) => inventory.order_returns),
    __metadata("design:type", inventory_model_1.Inventory)
], OrderReturn.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderReturn.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderReturn.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderReturn.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_model_1.Order, (order) => order.order_returns),
    __metadata("design:type", order_model_1.Order)
], OrderReturn.prototype, "order", void 0);
OrderReturn = __decorate([
    (0, typeorm_1.Entity)()
], OrderReturn);
exports.OrderReturn = OrderReturn;
