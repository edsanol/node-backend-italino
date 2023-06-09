import { DataSource } from "typeorm";
import { User } from "./domain/models/user.model";
import { Category } from "./domain/models/category.model";
import { Inventory } from "./domain/models/inventory.model";
import { Role } from "./domain/models/role.model";
import { Activity } from "./domain/models/activity.model";
import { Customer } from "./domain/models/customer.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "italinodb",
  entities: [Customer, User, Category, Role, Inventory, Activity],
  logging: true,
  synchronize: true,
});
