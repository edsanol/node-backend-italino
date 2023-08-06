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
exports.OrderController = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const create_order_usecase_1 = require("../usercases/order/create-order.usecase");
const getAll_orders_usecase_1 = require("../usercases/order/getAll-orders.usecase");
const getByUserId_order_usecase_1 = require("../usercases/order/getByUserId-order.usecase");
const getById_order_usecase_1 = require("../usercases/order/getById-order.usecase");
const update_order_usecase_1 = require("../usercases/order/update-order.usecase");
const create_return_usecase_1 = require("../usercases/order/create-return.usecase");
const get_order_and_return_by_id_usecase_1 = require("../usercases/order/get-order-and-return-by-id.usecase");
const get_order_by_reference_usecase_1 = require("../usercases/order/get-order-by-reference.usecase");
const get_order_stats_usecase_1 = require("../usercases/order/get-order-stats.usecase");
const get_order_production_usecase_1 = require("../usercases/order/get-order-production.usecase");
let OrderController = class OrderController {
    constructor(createOrderUseCase, getAllOrdersUseCase, getAllOrdersByUserIdUseCase, getOrderByIdUseCase, updateOrderUseCase, createReturnOrderUseCase, getOrderAndReturnByIdUseCase, getOrderByReferenceUseCase, getOrderStatsUseCase, getOrderProductionUseCase) {
        this.createOrderUseCase = createOrderUseCase;
        this.getAllOrdersUseCase = getAllOrdersUseCase;
        this.getAllOrdersByUserIdUseCase = getAllOrdersByUserIdUseCase;
        this.getOrderByIdUseCase = getOrderByIdUseCase;
        this.updateOrderUseCase = updateOrderUseCase;
        this.createReturnOrderUseCase = createReturnOrderUseCase;
        this.getOrderAndReturnByIdUseCase = getOrderAndReturnByIdUseCase;
        this.getOrderByReferenceUseCase = getOrderByReferenceUseCase;
        this.getOrderStatsUseCase = getOrderStatsUseCase;
        this.getOrderProductionUseCase = getOrderProductionUseCase;
    }
    createOrder(req, res) {
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
                const order = req.body;
                const newOrder = yield this.createOrderUseCase.execute(order);
                res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                    data: newOrder,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating order",
                    error: `Error creating order ${error.message}`,
                });
            }
        });
    }
    getAllOrders(req, res) {
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
                const allOrders = yield this.getAllOrdersUseCase.execute();
                res.status(201).json({
                    success: true,
                    message: "All orders",
                    data: allOrders,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting all orders ${error.message}`,
                });
            }
        });
    }
    getAllOrdersByUserId(req, res) {
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
                const userIdFromParams = Number(req.params.id);
                const allOrders = yield this.getAllOrdersByUserIdUseCase.execute(userIdFromParams);
                res.status(201).json({
                    success: true,
                    message: "All orders by user",
                    data: allOrders,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting all orders by user ${error.message}`,
                });
            }
        });
    }
    getOrderById(req, res) {
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
                const id = Number(req.params.id);
                const order = yield this.getOrderByIdUseCase.execute(id);
                res.status(201).json({
                    success: true,
                    message: "Order by id",
                    data: order,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting order by id ${error.message}`,
                });
            }
        });
    }
    updateOrder(req, res) {
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
                const order = req.body;
                const updatedOrder = yield this.updateOrderUseCase.execute(order);
                res.status(201).json({
                    success: true,
                    message: "Order updated successfully",
                    data: updatedOrder,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating order ${error.message}`,
                });
            }
        });
    }
    createReturnOrder(req, res) {
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
                const order = req.body;
                const newOrder = yield this.createReturnOrderUseCase.execute(order);
                res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                    data: newOrder,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating order",
                    error: `Error creating order ${error.message}`,
                });
            }
        });
    }
    getOrderAndReturnById(req, res) {
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
                const id = Number(req.params.id);
                const order = yield this.getOrderAndReturnByIdUseCase.execute(id);
                res.status(201).json({
                    success: true,
                    message: "Order by id",
                    data: order,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting order by id ${error.message}`,
                });
            }
        });
    }
    getOrderByReference(req, res) {
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
                const reference = req.params.reference;
                const order = yield this.getOrderByReferenceUseCase.execute(reference);
                res.status(201).json({
                    success: true,
                    message: "Order by reference",
                    data: order,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting order by reference ${error.message}`,
                });
            }
        });
    }
    getOrderStats(req, res) {
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
                const orderStats = yield this.getOrderStatsUseCase.execute();
                res.status(201).json({
                    success: true,
                    message: "Order stats",
                    data: orderStats,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting order stats ${error.message}`,
                });
            }
        });
    }
    getOrdersProduction(req, res) {
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
                const ordersProduction = yield this.getOrderProductionUseCase.execute();
                res.status(201).json({
                    success: true,
                    message: "Orders production",
                    data: ordersProduction,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting orders production ${error.message}`,
                });
            }
        });
    }
};
OrderController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateOrderUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllOrdersUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetAllOrdersByUserIdUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.GetOrderByIdUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.UpdateOrderUseCase)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.CreateReturnOrderUseCase)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.GetOrderAndReturnByIdUseCase)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.GetOrderByReferenceUseCase)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.GetOrderStatsUseCase)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.GetOrderProductionUseCase)),
    __metadata("design:paramtypes", [create_order_usecase_1.CreateOrderUseCase,
        getAll_orders_usecase_1.GetAllOrdersUseCase,
        getByUserId_order_usecase_1.GetAllOrdersByUserIdUseCase,
        getById_order_usecase_1.GetOrderByIdUseCase,
        update_order_usecase_1.UpdateOrderUseCase,
        create_return_usecase_1.CreateReturnOrderUseCase,
        get_order_and_return_by_id_usecase_1.GetOrderAndReturnByIdUseCase,
        get_order_by_reference_usecase_1.GetOrderByReferenceUseCase,
        get_order_stats_usecase_1.GetOrderStatsUseCase,
        get_order_production_usecase_1.GetOrderProductionUseCase])
], OrderController);
exports.OrderController = OrderController;
