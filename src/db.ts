import { DataSource } from "typeorm";
import { User } from "./domain/models/user.model";
import { Category } from "./domain/models/category.model";
import { Inventory } from "./domain/models/inventory.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "italinodb",
  entities: [User, Category, Inventory],
  logging: true,
  synchronize: true,
});
