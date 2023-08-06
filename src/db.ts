import { DataSource } from "typeorm";
import { User } from "./domain/models/user.model";
import { Category } from "./domain/models/category.model";
import { Inventory } from "./domain/models/inventory.model";
import { Role } from "./domain/models/role.model";
import { Activity } from "./domain/models/activity.model";
import { Customer } from "./domain/models/customer.model";
import { Order } from "./domain/models/order.model";
import { OrderDetail } from "./domain/models/order-detail.model";
import { OrderReturn } from "./domain/models/order-return.model";
import { AddInventory } from "./domain/models/add-inventory.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Customer,
    User,
    Category,
    Role,
    Inventory,
    Activity,
    Order,
    OrderDetail,
    OrderReturn,
    AddInventory,
  ],
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  // synchronize: true,
  // connectTimeout: 30000,
  // acquireTimeout: 30000,
  // extra: {
  //   connectionLimit: 1000,
  // },
});
