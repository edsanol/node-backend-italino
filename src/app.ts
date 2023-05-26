import express from "express";
import morgan from "morgan";
import cors from "cors";
import { container } from "./config/inversify.config";
import { UserRoutes } from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
const userRoutes = container.resolve<UserRoutes>(UserRoutes);
userRoutes.configureRoutes(app);

// Configuración de Swagger
setupSwagger(app);

export default app;
