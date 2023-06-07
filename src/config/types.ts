const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  InventoryRepository: Symbol.for("InventoryRepository"),
  ActivityRepository: Symbol.for("ActivityRepository"),
  RoleRepository: Symbol.for("RoleRepository"),

  UserService: Symbol.for("UserService"),
  CategoryService: Symbol.for("CategoryService"),
  InventoryService: Symbol.for("InventoryService"),
  ActivityService: Symbol.for("ActivityService"),
  RoleService: Symbol.for("RoleService"),

  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),

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

  UserController: Symbol.for("UserController"),
  CategoryController: Symbol.for("CategoryController"),
  InventoryController: Symbol.for("InventoryController"),
  ActivityController: Symbol.for("ActivityController"),
  RoleController: Symbol.for("RoleController"),

  UserRoutes: Symbol.for("UserRoutes"),
  CategoryRoutes: Symbol.for("CategoryRoutes"),
  InventoryRoutes: Symbol.for("InventoryRoutes"),
  ActivityRoutes: Symbol.for("ActivityRoutes"),
  RoleRoutes: Symbol.for("RoleRoutes"),
};

export { TYPES };
