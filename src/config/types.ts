const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  InventoryRepository: Symbol.for("InventoryRepository"),

  UserService: Symbol.for("UserService"),
  CategoryService: Symbol.for("CategoryService"),
  InventoryService: Symbol.for("InventoryService"),

  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),

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

  UserController: Symbol.for("UserController"),
  CategoryController: Symbol.for("CategoryController"),
  InventoryController: Symbol.for("InventoryController"),

  UserRoutes: Symbol.for("UserRoutes"),
  CategoryRoutes: Symbol.for("CategoryRoutes"),
  InventoryRoutes: Symbol.for("InventoryRoutes"),
};

export { TYPES };
