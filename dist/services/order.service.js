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
exports.OrderServiceImpl = void 0;
const order_model_1 = require("../domain/models/order.model");
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const order_detail_model_1 = require("../domain/models/order-detail.model");
const order_return_model_1 = require("../domain/models/order-return.model");
const app_1 = require("../app");
let OrderServiceImpl = class OrderServiceImpl {
    constructor(orderRepository, orderDetailRepository, userRepository, customerRepository, inventoryRepository, orderReturnRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.inventoryRepository = inventoryRepository;
        this.orderReturnRepository = orderReturnRepository;
    }
    getOrderProduction() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.getOrderProduction();
        });
    }
    getOrderInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.getOrderInfo();
        });
    }
    getOrderByReference(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.getOrderByReference(reference);
        });
    }
    getOrderAndOrderReturnsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.getOrderAndOrderReturnsById(id);
        });
    }
    createOrderReturns(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOrder = yield this.orderRepository.getOrderById(order.id);
            const inventories = yield Promise.all(order.orderDetails.map((orderDetail) => __awaiter(this, void 0, void 0, function* () {
                const inventory = yield this.inventoryRepository.getInventoryById(orderDetail.inventoryId);
                if (!inventory) {
                    throw new Error("Inventory not found");
                }
                return {
                    orderDetail,
                    inventory,
                };
            })));
            if (!existingOrder) {
                throw new Error("Order not found");
            }
            const inventoryToReturn = order.OrderReturns;
            if (!inventoryToReturn) {
                throw new Error("Inventory to return not found");
            }
            const updatedOrderDetails = [];
            const orderReturn = [];
            let totalOrder = 0;
            for (const { inventory } of inventories) {
                const matchingReturn = inventoryToReturn.find((item) => item.inventoryId === inventory.id_inventory);
                const orderDetail = existingOrder.order_details.find((item) => item.inventory.id_inventory === inventory.id_inventory);
                if (!orderDetail) {
                    throw new Error("Order detail not found");
                }
                if (matchingReturn) {
                    if (matchingReturn.quantity > orderDetail.quantity) {
                        throw new Error("Invalid return quantity");
                    }
                }
                const newOrderDetail = new order_detail_model_1.OrderDetail();
                newOrderDetail.id_order_detail = orderDetail.id_order_detail;
                newOrderDetail.inventory = inventory;
                newOrderDetail.quantity =
                    orderDetail.quantity - (matchingReturn === null || matchingReturn === void 0 ? void 0 : matchingReturn.quantity);
                newOrderDetail.updated_at = new Date();
                updatedOrderDetails.push(newOrderDetail);
                totalOrder += inventory.selling_price_inventory * newOrderDetail.quantity;
                const newOrderReturn = new order_return_model_1.OrderReturn();
                newOrderReturn.inventory = inventory;
                newOrderReturn.quantity = matchingReturn === null || matchingReturn === void 0 ? void 0 : matchingReturn.quantity;
                newOrderReturn.created_at = new Date();
                newOrderReturn.updated_at = new Date();
                orderReturn.push(newOrderReturn);
            }
            const newOrder = new order_model_1.Order();
            newOrder.id_order = existingOrder.id_order;
            newOrder.reference_order = existingOrder.reference_order;
            newOrder.customer = existingOrder.customer;
            newOrder.user = existingOrder.user;
            newOrder.order_details = updatedOrderDetails;
            newOrder.order_returns = [...existingOrder.order_returns, ...orderReturn];
            newOrder.total_order = totalOrder;
            newOrder.updated_at = new Date();
            newOrder.payment_order = existingOrder.payment_order;
            newOrder.type_order = existingOrder.type_order;
            newOrder.status_order = existingOrder.status_order;
            yield this.orderRepository.updateOrder(newOrder);
            const orderUpdated = yield this.orderRepository.getOrderById(existingOrder.id_order);
            if (!orderUpdated) {
                throw new Error("Order not found");
            }
            for (const updatedOrderDetail of updatedOrderDetails) {
                updatedOrderDetail.order = orderUpdated;
            }
            for (const order of orderReturn) {
                order.order = orderUpdated;
            }
            yield Promise.all([
                this.orderDetailRepository.createManyOrderDetails(updatedOrderDetails),
                this.orderReturnRepository.createManyOrderReturns(orderReturn),
            ]);
            yield Promise.all(orderReturn.map((orderReturn) => __awaiter(this, void 0, void 0, function* () {
                const inventory = yield this.inventoryRepository.getInventoryById(orderReturn.inventory.id_inventory);
                if (!inventory) {
                    throw new Error("Inventory not found");
                }
                inventory.stock_inventory += orderReturn.quantity;
                yield this.inventoryRepository.updateInventory(inventory);
            })));
            const orderToReturn = yield this.orderRepository.getOrderById(existingOrder.id_order);
            if (!orderToReturn) {
                throw new Error("Order not found");
            }
            return orderToReturn;
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user, customer, inventories] = yield Promise.all([
                this.userRepository.getUserById(order.userId),
                this.customerRepository.getCustomerById(order.customerId),
                Promise.all(order.orderDetails.map((orderDetail) => __awaiter(this, void 0, void 0, function* () {
                    const inventory = yield this.inventoryRepository.getInventoryById(orderDetail.inventoryId);
                    if (!inventory) {
                        throw new Error("Inventory not found");
                    }
                    return {
                        orderDetail,
                        inventory,
                    };
                }))),
            ]);
            if (!user || !customer) {
                throw new Error("User not found");
            }
            let totalOrder = 0;
            const orderDetails = [];
            for (const { orderDetail, inventory } of inventories) {
                if (inventory.stock_inventory < orderDetail.quantity) {
                    throw new Error("Inventory not enough");
                }
                totalOrder += inventory.selling_price_inventory * orderDetail.quantity;
                const newOrderDetail = new order_detail_model_1.OrderDetail();
                newOrderDetail.inventory = inventory;
                newOrderDetail.quantity = orderDetail.quantity;
                newOrderDetail.created_at = new Date();
                newOrderDetail.updated_at = new Date();
                orderDetails.push(newOrderDetail);
            }
            const newOrder = new order_model_1.Order();
            newOrder.reference_order = `IT${Math.floor(Math.random() * 1000000000)}`;
            newOrder.customer = customer;
            newOrder.user = user;
            newOrder.status_order = order.statusOrder;
            newOrder.payment_order = order.paymentOrder;
            newOrder.type_order = order.typeOrder;
            newOrder.total_order = totalOrder;
            newOrder.created_at = new Date();
            newOrder.updated_at = new Date();
            const createdOrder = yield this.orderRepository.createOrder(newOrder);
            for (const orderDetail of orderDetails) {
                orderDetail.order = createdOrder;
            }
            yield this.orderDetailRepository.createManyOrderDetails(orderDetails);
            yield Promise.all(orderDetails.map((orderDetail) => __awaiter(this, void 0, void 0, function* () {
                const inventoryItem = orderDetail.inventory;
                inventoryItem.stock_inventory -= orderDetail.quantity;
                yield this.inventoryRepository.updateInventory(inventoryItem);
            })));
            const orderCreated = yield this.orderRepository.getOrderById(createdOrder.id_order);
            if (!orderCreated) {
                throw new Error("Order not found");
            }
            app_1.io.emit("nuevaOrden", { mensaje: "Nueva orden recibida" });
            return orderCreated;
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.getAllOrders();
            return orders;
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = new order_model_1.Order();
            newOrder.id_order = order.id;
            newOrder.status_order = order.statusOrder;
            newOrder.payment_order = order.paymentOrder;
            newOrder.type_order = order.typeOrder;
            newOrder.total_order = order.totalOrder;
            newOrder.updated_at = new Date();
            if (newOrder.status_order === "Cancelado") {
                const order = yield this.orderRepository.getOrderById(newOrder.id_order);
                if (!order) {
                    throw new Error("Order not found");
                }
                yield Promise.all(order.order_details.map((orderDetail) => __awaiter(this, void 0, void 0, function* () {
                    const inventoryItem = orderDetail.inventory;
                    inventoryItem.stock_inventory += orderDetail.quantity;
                    yield this.inventoryRepository.updateInventory(inventoryItem);
                })));
            }
            if (newOrder.status_order === "Entregado") {
                app_1.io.emit("nuevaProducción", { mensaje: "Nuevo pedido a producción" });
            }
            yield this.orderRepository.updateOrder(newOrder);
            const updatedOrder = yield this.orderRepository.getOrderById(order.id);
            if (!updatedOrder) {
                throw new Error("Order not found");
            }
            return updatedOrder;
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.getOrderById(id);
            return order;
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.getOrdersByUserId(userId);
            return orders;
        });
    }
};
OrderServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.OrderRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.OrderDetailRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.CustomerRepository)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.InventoryRepository)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.OrderReturnRepository)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], OrderServiceImpl);
exports.OrderServiceImpl = OrderServiceImpl;
