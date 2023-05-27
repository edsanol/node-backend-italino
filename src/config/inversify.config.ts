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
import { InventoryRepositoryInterface } from "../domain/repositories/inventory.repository.interface";
import { InventoryRepositoryImpl } from "../repositories/inventory.repository";
import { InventoryServiceInterface } from "../interfaces/inventory.service.interface";
import { InventoryServiceImpl } from "../services/inventory.service";
import { CreateInventoryUseCase } from "../usercases/inventory/create-inventory.usecase";
import { GetAllInventoriesUseCase } from "../usercases/inventory/getall-inventory.usecase";
import { GetInventoryUseCase } from "../usercases/inventory/get-inventory.usecase";
import { DeleteInventoryUseCase } from "../usercases/inventory/delete-inventory.usecase";
import { UpdateInventoryUseCase } from "../usercases/inventory/update-inventory.usecase";
import { InventoryController } from "../controllers/inventory.controller";
import { InventoryRoutes } from "../routes/inventory.routes";

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
container
  .bind<InventoryRepositoryInterface>(TYPES.InventoryRepository)
  .to(InventoryRepositoryImpl)
  .inSingletonScope();

// Services
container.bind<UserServiceInterface>(TYPES.UserService).to(UserServiceImpl);
container
  .bind<CategoryServiceInterface>(TYPES.CategoryService)
  .to(CategoryServiceImpl);
container
  .bind<InventoryServiceInterface>(TYPES.InventoryService)
  .to(InventoryServiceImpl);

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

container
  .bind<CreateInventoryUseCase>(TYPES.CreateInventoryUseCase)
  .to(CreateInventoryUseCase);
container
  .bind<GetAllInventoriesUseCase>(TYPES.GetAllInventoriesUseCase)
  .to(GetAllInventoriesUseCase);
container
  .bind<GetInventoryUseCase>(TYPES.GetInventoryUseCase)
  .to(GetInventoryUseCase);
container
  .bind<DeleteInventoryUseCase>(TYPES.DeleteInventoryUseCase)
  .to(DeleteInventoryUseCase);
container
  .bind<UpdateInventoryUseCase>(TYPES.UpdateInventoryUseCase)
  .to(UpdateInventoryUseCase);

// Controllers
container.bind<UserController>(TYPES.UserController).to(UserController);
container
  .bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController);
container
  .bind<InventoryController>(TYPES.InventoryController)
  .to(InventoryController);

// Routes
container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
container.bind<CategoryRoutes>(TYPES.CategoryRoutes).to(CategoryRoutes);
container.bind<InventoryRoutes>(TYPES.InventoryRoutes).to(InventoryRoutes);

export { container };
