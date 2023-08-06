"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const db_1 = require("./db");
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app_1.server.listen(Number(process.env.APP_PORT), () => {
        console.log("Server listening on port 3000");
    });
})
    .catch((err) => {
    console.error(err);
});
