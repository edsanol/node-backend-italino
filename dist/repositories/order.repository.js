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
exports.OrderRepositoryImpl = void 0;
const inversify_1 = require("inversify");
const order_model_1 = require("../domain/models/order.model");
const db_1 = require("../db");
let OrderRepositoryImpl = class OrderRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(order_model_1.Order);
    }
    getOrderProduction() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .where("order.status_order = :status1", { status1: "Salida" })
                .orWhere("order.status_order = :status2", { status2: "Entregado" })
                .orderBy("order.created_at", "DESC")
                .limit(500)
                .getMany();
            return orders;
        });
    }
    getOrderInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalOrders = yield this.db.count();
            const totalOrdersDelivered = yield this.db.count({
                where: { status_order: "Salida" },
            });
            const totalOrdersPending = yield this.db.count({
                where: { status_order: "Entregado" },
            });
            const totalOrdersCanceled = yield this.db.count({
                where: { status_order: "Cancelado" },
            });
            const totalOrdersInProcess = yield this.db.count({
                where: { status_order: "Pendiente" },
            });
            // top 5 products most sold
            const productsMostSold = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .select("inventory.id_inventory", "id")
                .addSelect("inventory.name_inventory", "name")
                .addSelect("inventory.reference_inventory", "reference")
                .addSelect("SUM(order_details.quantity)", "total")
                .groupBy("inventory.id_inventory")
                .orderBy("total", "DESC")
                .limit(5)
                .getRawMany();
            // get solds by month (Enero, Febrero, Marzo, etc)
            const soldsByMonth = yield this.db
                .createQueryBuilder("order")
                .select("MONTH(order.created_at)", "month")
                .addSelect("SUM(order.total_order)", "total")
                .groupBy("month")
                .orderBy("month", "ASC")
                .getRawMany();
            const orderStats = {
                totalOrders,
                totalOrdersDelivered,
                totalOrdersPending,
                totalOrdersCanceled,
                totalOrdersInProcess,
                productsMostSold,
                soldsByMonth,
            };
            return orderStats;
        });
    }
    getOrderByReference(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .leftJoinAndSelect("order.customer", "customer")
                .leftJoinAndSelect("order.order_returns", "order_returns")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .where("order.reference_order LIKE :reference", {
                reference: `%${reference}%`,
            })
                .limit(1000)
                .getMany();
            return order;
        });
    }
    getOrderAndOrderReturnsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .leftJoinAndSelect("order.customer", "customer")
                .leftJoinAndSelect("order.order_returns", "order_returns")
                .leftJoinAndSelect("order_returns.inventory", "inventory")
                .where("order.id_order = :id", { id })
                .getOne();
            if (order) {
                order.user.password_user = "";
            }
            return order;
        });
    }
    createOrderReturns(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.save(order);
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .leftJoinAndSelect("order.customer", "customer")
                .leftJoinAndSelect("order.order_returns", "order_returns")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .limit(1000)
                .getMany();
            orders.forEach((order) => {
                order.user.password_user = "";
            });
            return orders;
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .leftJoinAndSelect("order.customer", "customer")
                .leftJoinAndSelect("order.order_returns", "order_returns")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .where("order.user.id_user = :userId", { userId })
                .getMany();
            orders.forEach((order) => {
                order.user.password_user = "";
            });
            return orders;
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.manager.save(order);
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.manager.save(order);
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.db
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .leftJoinAndSelect("order.customer", "customer")
                .leftJoinAndSelect("order.order_returns", "order_returns")
                .leftJoinAndSelect("order.order_details", "order_details")
                .leftJoinAndSelect("order_details.inventory", "inventory")
                .where("order.id_order = :id", { id })
                .getOne();
            if (order) {
                order.user.password_user = "";
            }
            return order;
        });
    }
};
OrderRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], OrderRepositoryImpl);
exports.OrderRepositoryImpl = OrderRepositoryImpl;
