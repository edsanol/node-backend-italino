import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import { container } from "./config/inversify.config";
import { UserRoutes } from "./routes/user.routes";
import swaggerDocs from "./config/swagger";
import { CategoryRoutes } from "./routes/category.routes";
import { InventoryRoutes } from "./routes/inventory.routes";
import { ActivityRoutes } from "./routes/activity.routes";
import { RoleRoutes } from "./routes/role.routes";
import { CustomerRoutes } from "./routes/customer.routes";
import { OrderRoutes } from "./routes/order.routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
const userRoutes = container.resolve<UserRoutes>(UserRoutes);
userRoutes.configureRoutes(app);

const categoryRoutes = container.resolve<CategoryRoutes>(CategoryRoutes);
categoryRoutes.configureRoutes(app);

const inventoryRoutes = container.resolve<InventoryRoutes>(InventoryRoutes);
inventoryRoutes.configureRoutes(app);

const activityRoutes = container.resolve<ActivityRoutes>(ActivityRoutes);
activityRoutes.configureRoutes(app);

const roleRoutes = container.resolve<RoleRoutes>(RoleRoutes);
roleRoutes.configureRoutes(app);

const customerRoutes = container.resolve<CustomerRoutes>(CustomerRoutes);
customerRoutes.configureRoutes(app);

const orderRoutes = container.resolve<OrderRoutes>(OrderRoutes);
orderRoutes.configureRoutes(app);

// Configuración de Swagger
swaggerDocs(app, Number(process.env.APP_PORT));

io.on("connection", (socket) => {
  console.log("Un nuevo cliente se ha conectado");
});

export { server, io, app };
