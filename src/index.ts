import "reflect-metadata";
import { server } from "./app";
import { AppDataSource } from "./db";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    server.listen(Number(process.env.APP_PORT), () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
