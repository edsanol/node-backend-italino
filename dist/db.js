"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./domain/models/user.model");
const category_model_1 = require("./domain/models/category.model");
const inventory_model_1 = require("./domain/models/inventory.model");
const role_model_1 = require("./domain/models/role.model");
const activity_model_1 = require("./domain/models/activity.model");
const customer_model_1 = require("./domain/models/customer.model");
const order_model_1 = require("./domain/models/order.model");
const order_detail_model_1 = require("./domain/models/order-detail.model");
const order_return_model_1 = require("./domain/models/order-return.model");
const add_inventory_model_1 = require("./domain/models/add-inventory.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        customer_model_1.Customer,
        user_model_1.User,
        category_model_1.Category,
        role_model_1.Role,
        inventory_model_1.Inventory,
        activity_model_1.Activity,
        order_model_1.Order,
        order_detail_model_1.OrderDetail,
        order_return_model_1.OrderReturn,
        add_inventory_model_1.AddInventory,
    ],
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    },
    // synchronize: true,
    connectTimeout: 30000,
    acquireTimeout: 30000,
    extra: {
        connectionLimit: 1000,
    },
});
