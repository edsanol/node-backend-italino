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
exports.CustomerRoutes = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const customer_controller_1 = require("../controllers/customer.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let CustomerRoutes = class CustomerRoutes {
    constructor(customerController) {
        this.customerController = customerController;
    }
    configureRoutes(router) {
        router.get("/customers", validate_jwt_1.validateJWT, this.customerController.getAllCustomers.bind(this.customerController));
        router.post("/customers", validate_jwt_1.validateJWT, this.customerController.createCustomer.bind(this.customerController));
        router.get("/customers/:customerId", validate_jwt_1.validateJWT, this.customerController.getCustomer.bind(this.customerController));
        router.put("/customers/:customerId", validate_jwt_1.validateJWT, this.customerController.updateCustomer.bind(this.customerController));
        router.delete("/customers/:customerId", validate_jwt_1.validateJWT, this.customerController.deleteCustomer.bind(this.customerController));
        router.get("/customersBySaller/:userId", validate_jwt_1.validateJWT, this.customerController.getCustomerByUserId.bind(this.customerController));
        router.get("/customers/search/:nameOrNit", validate_jwt_1.validateJWT, this.customerController.getCustomerByNameOrNit.bind(this.customerController));
        router.get("/customers-stats/stats", validate_jwt_1.validateJWT, this.customerController.getCustomerStats.bind(this.customerController));
    }
};
CustomerRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CustomerController)),
    __metadata("design:paramtypes", [customer_controller_1.CustomerController])
], CustomerRoutes);
exports.CustomerRoutes = CustomerRoutes;
