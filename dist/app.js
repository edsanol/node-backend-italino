"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const inversify_config_1 = require("./config/inversify.config");
const user_routes_1 = require("./routes/user.routes");
const swagger_1 = __importDefault(require("./config/swagger"));
const category_routes_1 = require("./routes/category.routes");
const inventory_routes_1 = require("./routes/inventory.routes");
const activity_routes_1 = require("./routes/activity.routes");
const role_routes_1 = require("./routes/role.routes");
const customer_routes_1 = require("./routes/customer.routes");
const order_routes_1 = require("./routes/order.routes");
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});
exports.io = io;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
const userRoutes = inversify_config_1.container.resolve(user_routes_1.UserRoutes);
userRoutes.configureRoutes(app);
const categoryRoutes = inversify_config_1.container.resolve(category_routes_1.CategoryRoutes);
categoryRoutes.configureRoutes(app);
const inventoryRoutes = inversify_config_1.container.resolve(inventory_routes_1.InventoryRoutes);
inventoryRoutes.configureRoutes(app);
const activityRoutes = inversify_config_1.container.resolve(activity_routes_1.ActivityRoutes);
activityRoutes.configureRoutes(app);
const roleRoutes = inversify_config_1.container.resolve(role_routes_1.RoleRoutes);
roleRoutes.configureRoutes(app);
const customerRoutes = inversify_config_1.container.resolve(customer_routes_1.CustomerRoutes);
customerRoutes.configureRoutes(app);
const orderRoutes = inversify_config_1.container.resolve(order_routes_1.OrderRoutes);
orderRoutes.configureRoutes(app);
// Configuración de Swagger
(0, swagger_1.default)(app, Number(process.env.APP_PORT));
io.on("connection", (socket) => {
    console.log("Un nuevo cliente se ha conectado");
});
