"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const user_repository_1 = require("../repositories/user.repository");
const user_service_1 = require("../services/user.service");
const create_user_usecase_1 = require("../usercases/user/create-user.usecase");
const get_user_usecase_1 = require("../usercases/user/get-user.usecase");
const update_user_usecase_1 = require("../usercases/user/update-user.usecase");
const delete_user_usecase_1 = require("../usercases/user/delete-user.usecase");
const user_controller_1 = require("../controllers/user.controller");
const user_routes_1 = require("../routes/user.routes");
const types_1 = require("./types");
const category_repository_1 = require("../repositories/category.repository");
const category_service_1 = require("../services/category.service");
const create_category_usecase_1 = require("../usercases/category/create-category.usecase");
const getall_categories_usecase_1 = require("../usercases/category/getall-categories.usecase");
const delete_category_usecase_1 = require("../usercases/category/delete-category.usecase");
const get_category_usecase_1 = require("../usercases/category/get-category.usecase");
const update_category_usecase_1 = require("../usercases/category/update-category.usecase");
const category_controller_1 = require("../controllers/category.controller");
const category_routes_1 = require("../routes/category.routes");
const inventory_repository_1 = require("../repositories/inventory.repository");
const inventory_service_1 = require("../services/inventory.service");
const create_inventory_usecase_1 = require("../usercases/inventory/create-inventory.usecase");
const getall_inventory_usecase_1 = require("../usercases/inventory/getall-inventory.usecase");
const get_inventory_usecase_1 = require("../usercases/inventory/get-inventory.usecase");
const delete_inventory_usecase_1 = require("../usercases/inventory/delete-inventory.usecase");
const update_inventory_usecase_1 = require("../usercases/inventory/update-inventory.usecase");
const inventory_controller_1 = require("../controllers/inventory.controller");
const inventory_routes_1 = require("../routes/inventory.routes");
const activity_repository_1 = require("../repositories/activity.repository");
const activity_service_1 = require("../services/activity.service");
const create_activity_usecase_1 = require("../usercases/activity/create-activity.usecase");
const get_activity_usecase_1 = require("../usercases/activity/get-activity.usecase");
const getall_activity_usecase_1 = require("../usercases/activity/getall-activity.usecase");
const delete_activity_usecase_1 = require("../usercases/activity/delete-activity.usecase");
const update_activity_usecase_1 = require("../usercases/activity/update-activity.usecase");
const activity_controller_1 = require("../controllers/activity.controller");
const activity_routes_1 = require("../routes/activity.routes");
const role_repository_1 = require("../repositories/role.repository");
const role_service_1 = require("../services/role.service");
const create_role_usecase_1 = require("../usercases/role/create-role.usecase");
const get_role_usecase_1 = require("../usercases/role/get-role.usecase");
const getall_role_usecase_1 = require("../usercases/role/getall-role.usecase");
const delete_role_usecase_1 = require("../usercases/role/delete-role.usecase");
const update_role_usecase_1 = require("../usercases/role/update-role.usecase");
const role_controller_1 = require("../controllers/role.controller");
const role_routes_1 = require("../routes/role.routes");
const getAll_user_usecase_1 = require("../usercases/user/getAll-user.usecase");
const login_user_usecase_1 = require("../usercases/user/login-user.usecase");
const customer_repository_1 = require("../repositories/customer.repository");
const customer_service_1 = require("../services/customer.service");
const create_customer_usecase_1 = require("../usercases/customer/create-customer.usecase");
const get_customer_usecase_1 = require("../usercases/customer/get-customer.usecase");
const getall_customers_usecase_1 = require("../usercases/customer/getall-customers.usecase");
const delete_customer_usecase_1 = require("../usercases/customer/delete-customer.usecase");
const update_customer_usecase_1 = require("../usercases/customer/update-customer.usecase");
const get_customer_by_userid_usecase_1 = require("../usercases/customer/get-customer-by-userid.usecase");
const customer_controller_1 = require("../controllers/customer.controller");
const customer_routes_1 = require("../routes/customer.routes");
const order_repository_1 = require("../repositories/order.repository");
const order_detail_repository_1 = require("../repositories/order-detail.repository");
const order_service_1 = require("../services/order.service");
const create_order_usecase_1 = require("../usercases/order/create-order.usecase");
const order_controller_1 = require("../controllers/order.controller");
const order_routes_1 = require("../routes/order.routes");
const getAll_orders_usecase_1 = require("../usercases/order/getAll-orders.usecase");
const getByUserId_order_usecase_1 = require("../usercases/order/getByUserId-order.usecase");
const getById_order_usecase_1 = require("../usercases/order/getById-order.usecase");
const update_order_usecase_1 = require("../usercases/order/update-order.usecase");
const create_return_usecase_1 = require("../usercases/order/create-return.usecase");
const order_return_repository_1 = require("../repositories/order-return.repository");
const add_inventory_usecase_1 = require("../usercases/inventory/add-inventory.usecase");
const get_inventory_add_usecase_1 = require("../usercases/inventory/get-inventory-add.usecase");
const get_inventory_by_name_or_reference_usecase_1 = require("../usercases/inventory/get-inventory-by-name-or-reference.usecase");
const get_order_and_return_by_id_usecase_1 = require("../usercases/order/get-order-and-return-by-id.usecase");
const get_order_by_reference_usecase_1 = require("../usercases/order/get-order-by-reference.usecase");
const update_inventory_app_usecase_1 = require("../usercases/inventory/update-inventory-app.usecase");
const get_customer_by_name_or_nit_usecase_1 = require("../usercases/customer/get-customer-by-name-or-nit.usecase");
const get_inventories_by_category_id_usecase_1 = require("../usercases/inventory/get-inventories-by-category-id.usecase");
const get_inventory_stats_usecase_1 = require("../usercases/inventory/get-inventory-stats.usecase");
const get_customer_stats_usecase_1 = require("../usercases/customer/get-customer-stats.usecase");
const get_order_stats_usecase_1 = require("../usercases/order/get-order-stats.usecase");
const get_order_production_usecase_1 = require("../usercases/order/get-order-production.usecase");
const update_password_usecase_1 = require("../usercases/user/update-password.usecase");
const forgot_password_usecase_1 = require("../usercases/user/forgot-password.usecase");
const reset_password_usecase_1 = require("../usercases/user/reset-password.usecase");
const container = new inversify_1.Container();
exports.container = container;
// Repositories
container
    .bind(types_1.TYPES.UserRepository)
    .to(user_repository_1.UserRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.CategoryRepository)
    .to(category_repository_1.CategoryRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.InventoryRepository)
    .to(inventory_repository_1.InventoryRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.ActivityRepository)
    .to(activity_repository_1.ActivityRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.RoleRepository)
    .to(role_repository_1.RoleRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.CustomerRepository)
    .to(customer_repository_1.CustomerRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.OrderRepository)
    .to(order_repository_1.OrderRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.OrderDetailRepository)
    .to(order_detail_repository_1.OrderDetailRepositoryImpl)
    .inSingletonScope();
container
    .bind(types_1.TYPES.OrderReturnRepository)
    .to(order_return_repository_1.OrderReturnRepositoryImpl)
    .inSingletonScope();
// Services
container.bind(types_1.TYPES.UserService).to(user_service_1.UserServiceImpl);
container
    .bind(types_1.TYPES.CategoryService)
    .to(category_service_1.CategoryServiceImpl);
container
    .bind(types_1.TYPES.InventoryService)
    .to(inventory_service_1.InventoryServiceImpl);
container
    .bind(types_1.TYPES.ActivityService)
    .to(activity_service_1.ActivityServiceImpl);
container.bind(types_1.TYPES.RoleService).to(role_service_1.RoleServiceImpl);
container
    .bind(types_1.TYPES.CustomerService)
    .to(customer_service_1.CustomerServiceImpl);
container.bind(types_1.TYPES.OrderService).to(order_service_1.OrderServiceImpl);
// Use Cases
container
    .bind(types_1.TYPES.CreateUserUseCase)
    .to(create_user_usecase_1.CreateUserUseCase);
container.bind(types_1.TYPES.GetUserUseCase).to(get_user_usecase_1.GetUserUseCase);
container
    .bind(types_1.TYPES.UpdateUserUseCase)
    .to(update_user_usecase_1.UpdateUserUseCase);
container
    .bind(types_1.TYPES.DeleteUserUseCase)
    .to(delete_user_usecase_1.DeleteUserUseCase);
container
    .bind(types_1.TYPES.GetAllUsersUseCase)
    .to(getAll_user_usecase_1.GetAllUsersUseCase);
container.bind(types_1.TYPES.LoginUserUseCase).to(login_user_usecase_1.LoginUserUseCase);
container
    .bind(types_1.TYPES.UpdatePasswordUseCase)
    .to(update_password_usecase_1.UpdatePasswordUseCase);
container
    .bind(types_1.TYPES.ForgotPasswordUseCase)
    .to(forgot_password_usecase_1.ForgotPasswordUseCase);
container
    .bind(types_1.TYPES.ResetPasswordUseCase)
    .to(reset_password_usecase_1.ResetPasswordUseCase);
container
    .bind(types_1.TYPES.CreateCategoryUseCase)
    .to(create_category_usecase_1.CreateCategoryUseCase);
container
    .bind(types_1.TYPES.GetAllCategoriesUseCase)
    .to(getall_categories_usecase_1.GetAllCategoriesUseCase);
container
    .bind(types_1.TYPES.GetCategoryUseCase)
    .to(get_category_usecase_1.GetCategoryUseCase);
container
    .bind(types_1.TYPES.DeleteCategoryUseCase)
    .to(delete_category_usecase_1.DeleteCategoryUseCase);
container
    .bind(types_1.TYPES.UpdateCategoryUseCase)
    .to(update_category_usecase_1.UpdateCategoryUseCase);
container
    .bind(types_1.TYPES.CreateInventoryUseCase)
    .to(create_inventory_usecase_1.CreateInventoryUseCase);
container
    .bind(types_1.TYPES.GetAllInventoriesUseCase)
    .to(getall_inventory_usecase_1.GetAllInventoriesUseCase);
container
    .bind(types_1.TYPES.GetInventoryUseCase)
    .to(get_inventory_usecase_1.GetInventoryUseCase);
container
    .bind(types_1.TYPES.DeleteInventoryUseCase)
    .to(delete_inventory_usecase_1.DeleteInventoryUseCase);
container
    .bind(types_1.TYPES.UpdateInventoryUseCase)
    .to(update_inventory_usecase_1.UpdateInventoryUseCase);
container
    .bind(types_1.TYPES.AddInventoryUseCase)
    .to(add_inventory_usecase_1.AddInventoryUseCase);
container
    .bind(types_1.TYPES.GetInventoryByIdAndAddUseCase)
    .to(get_inventory_add_usecase_1.GetInventoryByIdAndAddUseCase);
container
    .bind(types_1.TYPES.GetInventoryByNameOrReferenceUseCase)
    .to(get_inventory_by_name_or_reference_usecase_1.GetInventoryByNameOrReferenceUseCase);
container
    .bind(types_1.TYPES.UpdateInventoryFromAppUseCase)
    .to(update_inventory_app_usecase_1.UpdateInventoryFromAppUseCase);
container
    .bind(types_1.TYPES.GetInventoriesByCategoryIdUseCase)
    .to(get_inventories_by_category_id_usecase_1.GetInventoriesByCategoryIdUseCase);
container
    .bind(types_1.TYPES.GetInventoryStatsUseCase)
    .to(get_inventory_stats_usecase_1.GetInventoryStatsUseCase);
container
    .bind(types_1.TYPES.CreateActivityUseCase)
    .to(create_activity_usecase_1.CreateActivityUseCase);
container
    .bind(types_1.TYPES.GetActivityUseCase)
    .to(get_activity_usecase_1.GetActivityUseCase);
container
    .bind(types_1.TYPES.GetAllActivitiesUseCase)
    .to(getall_activity_usecase_1.GetAllActivityUseCase);
container
    .bind(types_1.TYPES.DeleteActivityUseCase)
    .to(delete_activity_usecase_1.DeleteActivityUseCase);
container
    .bind(types_1.TYPES.UpdateActivityUseCase)
    .to(update_activity_usecase_1.UpdateActivityUseCase);
container
    .bind(types_1.TYPES.CreateRoleUseCase)
    .to(create_role_usecase_1.CreateRoleUseCase);
container.bind(types_1.TYPES.GetRoleUseCase).to(get_role_usecase_1.GetRoleUseCase);
container
    .bind(types_1.TYPES.GetAllRolesUseCase)
    .to(getall_role_usecase_1.GetAllRolesUseCase);
container
    .bind(types_1.TYPES.DeleteRoleUseCase)
    .to(delete_role_usecase_1.DeleteRoleUseCase);
container
    .bind(types_1.TYPES.UpdateRoleUseCase)
    .to(update_role_usecase_1.UpdateRoleUseCase);
container
    .bind(types_1.TYPES.CreateCustomerUseCase)
    .to(create_customer_usecase_1.CreateCustomerUseCase);
container
    .bind(types_1.TYPES.GetCustomerUseCase)
    .to(get_customer_usecase_1.GetCustomerUseCase);
container
    .bind(types_1.TYPES.GetAllCustomersUseCase)
    .to(getall_customers_usecase_1.GetAllCustomersUseCase);
container
    .bind(types_1.TYPES.DeleteCustomerUseCase)
    .to(delete_customer_usecase_1.DeleteCustomerUseCase);
container
    .bind(types_1.TYPES.UpdateCustomerUseCase)
    .to(update_customer_usecase_1.UpdateCustomerUseCase);
container
    .bind(types_1.TYPES.GetCustomerByUserIdUseCase)
    .to(get_customer_by_userid_usecase_1.GetCustomerByUserIdUseCase);
container
    .bind(types_1.TYPES.GetCustomerByNameOrNitUseCase)
    .to(get_customer_by_name_or_nit_usecase_1.GetCustomerByNameOrNitUseCase);
container
    .bind(types_1.TYPES.GetCustomerStatsUseCase)
    .to(get_customer_stats_usecase_1.GetCustomerStatsUseCase);
container
    .bind(types_1.TYPES.CreateOrderUseCase)
    .to(create_order_usecase_1.CreateOrderUseCase);
container
    .bind(types_1.TYPES.GetAllOrdersUseCase)
    .to(getAll_orders_usecase_1.GetAllOrdersUseCase);
container
    .bind(types_1.TYPES.GetAllOrdersByUserIdUseCase)
    .to(getByUserId_order_usecase_1.GetAllOrdersByUserIdUseCase);
container
    .bind(types_1.TYPES.GetOrderByIdUseCase)
    .to(getById_order_usecase_1.GetOrderByIdUseCase);
container
    .bind(types_1.TYPES.UpdateOrderUseCase)
    .to(update_order_usecase_1.UpdateOrderUseCase);
container
    .bind(types_1.TYPES.CreateReturnOrderUseCase)
    .to(create_return_usecase_1.CreateReturnOrderUseCase);
container
    .bind(types_1.TYPES.GetOrderAndReturnByIdUseCase)
    .to(get_order_and_return_by_id_usecase_1.GetOrderAndReturnByIdUseCase);
container
    .bind(types_1.TYPES.GetOrderByReferenceUseCase)
    .to(get_order_by_reference_usecase_1.GetOrderByReferenceUseCase);
container
    .bind(types_1.TYPES.GetOrderStatsUseCase)
    .to(get_order_stats_usecase_1.GetOrderStatsUseCase);
container
    .bind(types_1.TYPES.GetOrderProductionUseCase)
    .to(get_order_production_usecase_1.GetOrderProductionUseCase);
// Controllers
container.bind(types_1.TYPES.UserController).to(user_controller_1.UserController);
container
    .bind(types_1.TYPES.CategoryController)
    .to(category_controller_1.CategoryController);
container
    .bind(types_1.TYPES.InventoryController)
    .to(inventory_controller_1.InventoryController);
container
    .bind(types_1.TYPES.ActivityController)
    .to(activity_controller_1.ActivityController);
container.bind(types_1.TYPES.RoleController).to(role_controller_1.RoleController);
container
    .bind(types_1.TYPES.CustomerController)
    .to(customer_controller_1.CustomerController);
container.bind(types_1.TYPES.OrderController).to(order_controller_1.OrderController);
// Routes
container.bind(types_1.TYPES.UserRoutes).to(user_routes_1.UserRoutes);
container.bind(types_1.TYPES.CategoryRoutes).to(category_routes_1.CategoryRoutes);
container.bind(types_1.TYPES.InventoryRoutes).to(inventory_routes_1.InventoryRoutes);
container.bind(types_1.TYPES.ActivityRoutes).to(activity_routes_1.ActivityRoutes);
container.bind(types_1.TYPES.RoleRoutes).to(role_routes_1.RoleRoutes);
container.bind(types_1.TYPES.CustomerRoutes).to(customer_routes_1.CustomerRoutes);
container.bind(types_1.TYPES.OrderRoutes).to(order_routes_1.OrderRoutes);
