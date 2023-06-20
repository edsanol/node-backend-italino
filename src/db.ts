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
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "italinodb",
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
  synchronize: true,
});
