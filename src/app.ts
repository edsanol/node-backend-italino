import express from "express";
import morgan from "morgan";
import cors from "cors";
import { container } from "./config/inversify.config";
import { UserRoutes } from "./routes/user.routes";
import swaggerDocs from "./config/swagger";
import { CategoryRoutes } from "./routes/category.routes";
import { InventoryRoutes } from "./routes/inventory.routes";
import { ActivityRoutes } from "./routes/activity.routes";
import { RoleRoutes } from "./routes/role.routes";
import { CustomerRoutes } from "./routes/customer.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

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

// Configuración de Swagger
swaggerDocs(app, 3000);

export default app;
