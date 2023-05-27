import { Container } from "inversify";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { UserRepositoryImpl } from "../repositories/user.repository";
import { UserServiceInterface } from "../interfaces/user.service.interface";
import { UserServiceImpl } from "../services/user.service";
import { CreateUserUseCase } from "../usercases/user/create-user.usecase";
import { GetUserUseCase } from "../usercases/user/get-user.usecase";
import { UpdateUserUseCase } from "../usercases/user/update-user.usecase";
import { DeleteUserUseCase } from "../usercases/user/delete-user.usecase";
import { UserController } from "../controllers/user.controller";
import { UserRoutes } from "../routes/user.routes";
import { TYPES } from "./types";
import { CategoryRepositoryInterface } from "../domain/repositories/category.repository.interface";
import { CategoryRepositoryImpl } from "../repositories/category.repository";
import { CategoryServiceInterface } from "../interfaces/category.service.interface";
import { CategoryServiceImpl } from "../services/category.service";
import { CreateCategoryUseCase } from "../usercases/category/create-category.usecase";
import { GetAllCategoriesUseCase } from "../usercases/category/getall-categories.usecase";
import { DeleteCategoryUseCase } from "../usercases/category/delete-category.usecase";
import { GetCategoryUseCase } from "../usercases/category/get-category.usecase";
import { UpdateCategoryUseCase } from "../usercases/category/update-category.usecase";
import { CategoryController } from "../controllers/category.controller";
import { CategoryRoutes } from "../routes/category.routes";

const container = new Container();

// Repositories
container
  .bind<UserRepositoryInterface>(TYPES.UserRepository)
  .to(UserRepositoryImpl)
  .inSingletonScope();
container
  .bind<CategoryRepositoryInterface>(TYPES.CategoryRepository)
  .to(CategoryRepositoryImpl)
  .inSingletonScope();

// Services
container.bind<UserServiceInterface>(TYPES.UserService).to(UserServiceImpl);
container
  .bind<CategoryServiceInterface>(TYPES.CategoryService)
  .to(CategoryServiceImpl);

// Use Cases
container
  .bind<CreateUserUseCase>(TYPES.CreateUserUseCase)
  .to(CreateUserUseCase);
container.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCase);
container
  .bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase)
  .to(UpdateUserUseCase);
container
  .bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase)
  .to(DeleteUserUseCase);

container
  .bind<CreateCategoryUseCase>(TYPES.CreateCategoryUseCase)
  .to(CreateCategoryUseCase);
container
  .bind<GetAllCategoriesUseCase>(TYPES.GetAllCategoriesUseCase)
  .to(GetAllCategoriesUseCase);
container
  .bind<GetCategoryUseCase>(TYPES.GetCategoryUseCase)
  .to(GetCategoryUseCase);
container
  .bind<DeleteCategoryUseCase>(TYPES.DeleteCategoryUseCase)
  .to(DeleteCategoryUseCase);
container
  .bind<UpdateCategoryUseCase>(TYPES.UpdateCategoryUseCase)
  .to(UpdateCategoryUseCase);

// Controllers
container.bind<UserController>(TYPES.UserController).to(UserController);
container
  .bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController);

// Routes
container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
container.bind<CategoryRoutes>(TYPES.CategoryRoutes).to(CategoryRoutes);

export { container };
