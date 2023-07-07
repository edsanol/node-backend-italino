const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  InventoryRepository: Symbol.for("InventoryRepository"),
  ActivityRepository: Symbol.for("ActivityRepository"),
  RoleRepository: Symbol.for("RoleRepository"),
  CustomerRepository: Symbol.for("CustomerRepository"),
  OrderRepository: Symbol.for("OrderRepository"),
  OrderDetailRepository: Symbol.for("OrderDetailRepository"),
  OrderReturnRepository: Symbol.for("OrderReturnRepository"),

  UserService: Symbol.for("UserService"),
  CategoryService: Symbol.for("CategoryService"),
  InventoryService: Symbol.for("InventoryService"),
  ActivityService: Symbol.for("ActivityService"),
  RoleService: Symbol.for("RoleService"),
  CustomerService: Symbol.for("CustomerService"),
  OrderService: Symbol.for("OrderService"),

  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
  LoginUserUseCase: Symbol.for("LoginUserUseCase"),

  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  GetAllCategoriesUseCase: Symbol.for("GetAllCategoriesUseCase"),
  DeleteCategoryUseCase: Symbol.for("DeleteCategoryUseCase"),
  GetCategoryUseCase: Symbol.for("GetCategoryUseCase"),
  UpdateCategoryUseCase: Symbol.for("UpdateCategoryUseCase"),

  CreateInventoryUseCase: Symbol.for("CreateInventoryUseCase"),
  GetAllInventoriesUseCase: Symbol.for("GetAllInventoriesUseCase"),
  DeleteInventoryUseCase: Symbol.for("DeleteInventoryUseCase"),
  GetInventoryUseCase: Symbol.for("GetInventoryUseCase"),
  UpdateInventoryUseCase: Symbol.for("UpdateInventoryUseCase"),
  AddInventoryUseCase: Symbol.for("AddInventoryUseCase"),
  GetInventoryByIdAndAddUseCase: Symbol.for("GetInventoryByIdAndAddUseCase"),
  GetInventoryByNameOrReferenceUseCase: Symbol.for(
    "GetInventoryByNameOrReferenceUseCase"
  ),
  UpdateInventoryFromAppUseCase: Symbol.for("UpdateInventoryFromAppUseCase"),
  GetInventoriesByCategoryIdUseCase: Symbol.for(
    "GetInventoriesByCategoryIdUseCase"
  ),

  CreateActivityUseCase: Symbol.for("CreateActivityUseCase"),
  GetAllActivitiesUseCase: Symbol.for("GetAllActivitiesUseCase"),
  DeleteActivityUseCase: Symbol.for("DeleteActivityUseCase"),
  GetActivityUseCase: Symbol.for("GetActivityUseCase"),
  UpdateActivityUseCase: Symbol.for("UpdateActivityUseCase"),

  CreateRoleUseCase: Symbol.for("CreateRoleUseCase"),
  GetAllRolesUseCase: Symbol.for("GetAllRolesUseCase"),
  DeleteRoleUseCase: Symbol.for("DeleteRoleUseCase"),
  GetRoleUseCase: Symbol.for("GetRoleUseCase"),
  UpdateRoleUseCase: Symbol.for("UpdateRoleUseCase"),

  CreateCustomerUseCase: Symbol.for("CreateCustomerUseCase"),
  GetAllCustomersUseCase: Symbol.for("GetAllCustomersUseCase"),
  DeleteCustomerUseCase: Symbol.for("DeleteCustomerUseCase"),
  GetCustomerUseCase: Symbol.for("GetCustomerUseCase"),
  UpdateCustomerUseCase: Symbol.for("UpdateCustomerUseCase"),
  GetCustomerByUserIdUseCase: Symbol.for("GetCustomerByUserIdUseCase"),

  CreateOrderUseCase: Symbol.for("CreateOrderUseCase"),
  GetAllOrdersUseCase: Symbol.for("GetAllOrdersUseCase"),
  GetAllOrdersByUserIdUseCase: Symbol.for("GetAllOrdersByUserIdUseCase"),
  GetOrderByIdUseCase: Symbol.for("GetOrderByIdUseCase"),
  UpdateOrderUseCase: Symbol.for("UpdateOrderUseCase"),
  CreateReturnOrderUseCase: Symbol.for("CreateReturnOrderUseCase"),
  GetOrderAndReturnByIdUseCase: Symbol.for("GetOrderAndReturnByIdUseCase"),
  GetOrderByReferenceUseCase: Symbol.for("GetOrderByReferenceUseCase"),

  UserController: Symbol.for("UserController"),
  CategoryController: Symbol.for("CategoryController"),
  InventoryController: Symbol.for("InventoryController"),
  ActivityController: Symbol.for("ActivityController"),
  RoleController: Symbol.for("RoleController"),
  CustomerController: Symbol.for("CustomerController"),
  OrderController: Symbol.for("OrderController"),

  UserRoutes: Symbol.for("UserRoutes"),
  CategoryRoutes: Symbol.for("CategoryRoutes"),
  InventoryRoutes: Symbol.for("InventoryRoutes"),
  ActivityRoutes: Symbol.for("ActivityRoutes"),
  RoleRoutes: Symbol.for("RoleRoutes"),
  CustomerRoutes: Symbol.for("CustomerRoutes"),
  OrderRoutes: Symbol.for("OrderRoutes"),
};

export { TYPES };
