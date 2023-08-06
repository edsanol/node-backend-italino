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
exports.CustomerController = void 0;
const inversify_1 = require("inversify");
const create_customer_usecase_1 = require("../usercases/customer/create-customer.usecase");
const getall_customers_usecase_1 = require("../usercases/customer/getall-customers.usecase");
const types_1 = require("../config/types");
const get_customer_usecase_1 = require("../usercases/customer/get-customer.usecase");
const update_customer_usecase_1 = require("../usercases/customer/update-customer.usecase");
const delete_customer_usecase_1 = require("../usercases/customer/delete-customer.usecase");
const get_customer_by_userid_usecase_1 = require("../usercases/customer/get-customer-by-userid.usecase");
const get_customer_by_name_or_nit_usecase_1 = require("../usercases/customer/get-customer-by-name-or-nit.usecase");
const get_customer_stats_usecase_1 = require("../usercases/customer/get-customer-stats.usecase");
let CustomerController = class CustomerController {
    constructor(createCustomerUseCase, getAllCustomersUseCase, getCustomerUseCase, updateCustomerUseCase, deleteCustomerUseCase, getCustomerByUserIdUseCase, getCustomerByNameOrNitUseCase, getCustomerStatsUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.getAllCustomersUseCase = getAllCustomersUseCase;
        this.getCustomerUseCase = getCustomerUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
        this.deleteCustomerUseCase = deleteCustomerUseCase;
        this.getCustomerByUserIdUseCase = getCustomerByUserIdUseCase;
        this.getCustomerByNameOrNitUseCase = getCustomerByNameOrNitUseCase;
        this.getCustomerStatsUseCase = getCustomerStatsUseCase;
    }
    createCustomer(req, res) {
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
                const customer = req.body;
                const newCustomer = yield this.createCustomerUseCase.execute(customer);
                res.status(201).json({
                    success: true,
                    message: "Customer created successfully",
                    data: newCustomer,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error creating customer ${error.message}`,
                });
            }
        });
    }
    getAllCustomers(req, res) {
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
                const allCustomers = yield this.getAllCustomersUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: "All customers",
                    data: allCustomers,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting customers ${error.message}`,
                });
            }
        });
    }
    getCustomer(req, res) {
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
                const customerId = Number(req.params.customerId);
                const customer = yield this.getCustomerUseCase.execute(customerId);
                if (customer) {
                    res.status(200).json({
                        success: true,
                        message: "Customer",
                        data: customer,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer not found",
                        error: "Customer not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting customer ${error.message}`,
                });
            }
        });
    }
    updateCustomer(req, res) {
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
                const customerId = Number(req.params.customerId);
                const data = req.body;
                const isUpdated = yield this.updateCustomerUseCase.execute(customerId, data);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "Customer updated successfully",
                        data: isUpdated,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer not found",
                        error: "Customer not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating customer ${error.message}`,
                });
            }
        });
    }
    deleteCustomer(req, res) {
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
                const customerId = Number(req.params.customerId);
                const isDeleted = yield this.deleteCustomerUseCase.execute(customerId);
                if (isDeleted) {
                    res.status(200).json({
                        success: true,
                        message: "Customer deleted successfully",
                        data: isDeleted,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer not found",
                        error: "Customer not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error deleting customer ${error.message}`,
                });
            }
        });
    }
    getCustomerByUserId(req, res) {
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
                const userIdFromParams = Number(req.params.userId);
                const customers = yield this.getCustomerByUserIdUseCase.execute(userIdFromParams);
                if (customers) {
                    res.status(200).json({
                        success: true,
                        message: "Customer",
                        data: customers,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer not found",
                        error: "Customer not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting customer ${error.message}`,
                });
            }
        });
    }
    getCustomerByNameOrNit(req, res) {
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
                const { nameOrNit } = req.params;
                const customers = yield this.getCustomerByNameOrNitUseCase.execute(nameOrNit);
                if (customers) {
                    res.status(200).json({
                        success: true,
                        message: "Customer",
                        data: customers,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer not found",
                        error: "Customer not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting customer ${error.message}`,
                });
            }
        });
    }
    getCustomerStats(req, res) {
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
                const stats = yield this.getCustomerStatsUseCase.execute();
                if (stats) {
                    res.status(200).json({
                        success: true,
                        message: "Customer stats",
                        data: stats,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Customer stats not found",
                        error: "Customer stats not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting customer ${error.message}`,
                });
            }
        });
    }
};
CustomerController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateCustomerUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllCustomersUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetCustomerUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UpdateCustomerUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DeleteCustomerUseCase)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.GetCustomerByUserIdUseCase)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.GetCustomerByNameOrNitUseCase)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.GetCustomerStatsUseCase)),
    __metadata("design:paramtypes", [create_customer_usecase_1.CreateCustomerUseCase,
        getall_customers_usecase_1.GetAllCustomersUseCase,
        get_customer_usecase_1.GetCustomerUseCase,
        update_customer_usecase_1.UpdateCustomerUseCase,
        delete_customer_usecase_1.DeleteCustomerUseCase,
        get_customer_by_userid_usecase_1.GetCustomerByUserIdUseCase,
        get_customer_by_name_or_nit_usecase_1.GetCustomerByNameOrNitUseCase,
        get_customer_stats_usecase_1.GetCustomerStatsUseCase])
], CustomerController);
exports.CustomerController = CustomerController;
