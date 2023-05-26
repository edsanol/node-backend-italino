import { DataSource } from "typeorm";
import { User } from "./domain/models/user.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "italinodb",
  entities: [User],
  logging: true,
  synchronize: true,
});
