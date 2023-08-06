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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const role_model_1 = require("./role.model");
const customer_model_1 = require("./customer.model");
const order_model_1 = require("./order.model");
const add_inventory_model_1 = require("./add-inventory.model");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 220, unique: true }),
    __metadata("design:type", String)
], User.prototype, "name_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 180, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], User.prototype, "password_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "status_user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_model_1.Role, (role) => role.users),
    __metadata("design:type", role_model_1.Role)
], User.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_model_1.Customer, (customer) => customer.user),
    __metadata("design:type", Array)
], User.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_model_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => add_inventory_model_1.AddInventory, (add_inventory) => add_inventory.user),
    __metadata("design:type", Array)
], User.prototype, "add_inventory", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
