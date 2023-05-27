const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  UserService: Symbol.for("UserService"),
  CategoryService: Symbol.for("CategoryService"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  CreateCategoryUseCase: Symbol.for("CreateCategoryUseCase"),
  GetAllCategoriesUseCase: Symbol.for("GetAllCategoriesUseCase"),
  DeleteCategoryUseCase: Symbol.for("DeleteCategoryUseCase"),
  GetCategoryUseCase: Symbol.for("GetCategoryUseCase"),
  UpdateCategoryUseCase: Symbol.for("UpdateCategoryUseCase"),
  UserController: Symbol.for("UserController"),
  CategoryController: Symbol.for("CategoryController"),
  UserRoutes: Symbol.for("UserRoutes"),
  CategoryRoutes: Symbol.for("CategoryRoutes"),
};

export { TYPES };
