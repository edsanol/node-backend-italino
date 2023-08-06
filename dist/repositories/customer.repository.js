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
exports.CustomerRepositoryImpl = void 0;
const customer_model_1 = require("../domain/models/customer.model");
const inversify_1 = require("inversify");
const db_1 = require("../db");
const user_model_1 = require("../domain/models/user.model");
let CustomerRepositoryImpl = class CustomerRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(customer_model_1.Customer);
        this.dbUser = db_1.AppDataSource.getRepository(user_model_1.User);
    }
    getCustomerStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCustomers = yield this.db.count();
            const activeCustomers = yield this.db.count({
                where: { status_customer: "Activo" },
            });
            const inactiveCustomers = yield this.db.count({
                where: { status_customer: "Inactivo" },
            });
            const ultimateCustomersAdded = yield this.db
                .createQueryBuilder("customer")
                .select("COUNT(customer.id_customer)", "created_at")
                .where("MONTH(customer.created_at) = MONTH(CURRENT_DATE())")
                .getRawOne();
            const customerStats = {
                totalCustomers,
                activeCustomers,
                inactiveCustomers,
                ultimateCustomersAdded: Number(ultimateCustomersAdded === null || ultimateCustomersAdded === void 0 ? void 0 : ultimateCustomersAdded.created_at),
            };
            return customerStats;
        });
    }
    getCustomerByNameOrNIT(nameOrNit) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerByNameOrNit = yield this.db
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.user", "user")
                .where("customer.name_customer LIKE :nameOrNit", {
                nameOrNit: `%${nameOrNit}%`,
            })
                .orWhere("customer.nit_customer LIKE :nameOrNit", {
                nameOrNit: `%${nameOrNit}%`,
            })
                .limit(20)
                .getMany();
            if (!customerByNameOrNit) {
                return null;
            }
            return customerByNameOrNit;
        });
    }
    createCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dbUser.findOneByOrFail({
                id_user: customer.userId,
            });
            const newCustomer = new customer_model_1.Customer();
            newCustomer.name_customer = customer.nameCustomer;
            newCustomer.nit_customer = customer.nitCustomer;
            newCustomer.address_customer = customer.addressCustomer;
            newCustomer.phone_customer = customer.phoneCustomer;
            newCustomer.status_customer = customer.statusCustomer;
            newCustomer.created_at = new Date();
            newCustomer.updated_at = new Date();
            newCustomer.user = user;
            return this.db.manager.save(newCustomer);
        });
    }
    getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCustomers = yield this.db
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.user", "user")
                .limit(50)
                .getMany();
            if (!allCustomers) {
                return null;
            }
            return allCustomers;
        });
    }
    getCustomerById(idCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerById = yield this.db.findOneBy({ id_customer: idCustomer });
            if (!customerById) {
                return null;
            }
            return customerById;
        });
    }
    getCustomerByUserId(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerByUserId = yield this.db
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.user", "user")
                .where("user.id_user = :id_user", { id_user: idUser })
                .getMany();
            if (customerByUserId.length === 0) {
                return null;
            }
            return customerByUserId;
        });
    }
    updateCustomer(idCustomer, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dbUser.findOneByOrFail({
                id_user: customer.userId,
            });
            const customerToUpdate = yield this.db.findOneByOrFail({
                id_customer: idCustomer,
            });
            if (!customerToUpdate) {
                throw new Error("Customer not found");
            }
            customerToUpdate.id_customer = customer.id;
            customerToUpdate.name_customer = customer.nameCustomer;
            customerToUpdate.nit_customer = customer.nitCustomer;
            customerToUpdate.address_customer = customer.addressCustomer;
            customerToUpdate.phone_customer = customer.phoneCustomer;
            customerToUpdate.status_customer = customer.statusCustomer;
            customerToUpdate.updated_at = new Date();
            yield this.db.manager.save(customerToUpdate);
            // get userupdated by idCustomer and by idUser
            const customerUpdated = yield this.db
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.user", "user")
                .where("user.id_user = :id_user", { id_user: user.id_user })
                .andWhere("customer.id_customer = :id_customer", {
                id_customer: customerToUpdate.id_customer,
            })
                .getOne();
            if (!customerUpdated) {
                throw new Error("Customer not found");
            }
            return customerUpdated;
        });
    }
    deleteCustomer(idCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerToDelete = yield this.db.findOneBy({
                id_customer: idCustomer,
            });
            if (!customerToDelete) {
                return false;
            }
            yield this.db.manager.remove(customerToDelete);
            return Promise.resolve(true);
        });
    }
};
CustomerRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CustomerRepositoryImpl);
exports.CustomerRepositoryImpl = CustomerRepositoryImpl;
