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
exports.OrderRoutes = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const order_controller_1 = require("../controllers/order.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let OrderRoutes = class OrderRoutes {
    constructor(orderController) {
        this.orderController = orderController;
    }
    configureRoutes(router) {
        router.post("/order", validate_jwt_1.validateJWT, this.orderController.createOrder.bind(this.orderController));
        router.get("/order", validate_jwt_1.validateJWT, this.orderController.getAllOrders.bind(this.orderController));
        router.get("/order/byUser/:id", validate_jwt_1.validateJWT, this.orderController.getAllOrdersByUserId.bind(this.orderController));
        router.get("/order/:id", validate_jwt_1.validateJWT, this.orderController.getOrderById.bind(this.orderController));
        router.put("/order", validate_jwt_1.validateJWT, this.orderController.updateOrder.bind(this.orderController));
        router.post("/order/return", validate_jwt_1.validateJWT, this.orderController.createReturnOrder.bind(this.orderController));
        router.get("/order/return/:id", validate_jwt_1.validateJWT, this.orderController.getOrderAndReturnById.bind(this.orderController));
        router.get("/order/reference/:reference", validate_jwt_1.validateJWT, this.orderController.getOrderByReference.bind(this.orderController));
        router.get("/order-stats/stats", validate_jwt_1.validateJWT, this.orderController.getOrderStats.bind(this.orderController));
        router.get("/order-production", validate_jwt_1.validateJWT, this.orderController.getOrdersProduction.bind(this.orderController));
    }
};
OrderRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.OrderController)),
    __metadata("design:paramtypes", [order_controller_1.OrderController])
], OrderRoutes);
exports.OrderRoutes = OrderRoutes;
