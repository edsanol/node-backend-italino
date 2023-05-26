const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  UserService: Symbol.for("UserService"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  GetUserUseCase: Symbol.for("GetUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
  UserController: Symbol.for("UserController"),
  UserRoutes: Symbol.for("UserRoutes"),
};

export { TYPES };
