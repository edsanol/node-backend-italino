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
import { ActivityRepositoryInterface } from "../domain/repositories/activity.repository.interface";
import { ActivityRepositoryImpl } from "../repositories/activity.repository";
import { ActivityServiceInterface } from "../interfaces/activity.service.interface";
import { ActivityServiceImpl } from "../services/activity.service";
import { CreateActivityUseCase } from "../usercases/activity/create-activity.usecase";
import { GetActivityUseCase } from "../usercases/activity/get-activity.usecase";
import { GetAllActivityUseCase } from "../usercases/activity/getall-activity.usecase";
import { DeleteActivityUseCase } from "../usercases/activity/delete-activity.usecase";
import { UpdateActivityUseCase } from "../usercases/activity/update-activity.usecase";
import { ActivityController } from "../controllers/activity.controller";
import { ActivityRoutes } from "../routes/activity.routes";
import { RoleRepositoryInterface } from "../domain/repositories/role.repository.interface";
import { RoleRepositoryImpl } from "../repositories/role.repository";
import { RoleServiceInterface } from "../interfaces/role.service.interface";
import { RoleServiceImpl } from "../services/role.service";
import { CreateRoleUseCase } from "../usercases/role/create-role.usecase";
import { GetRoleUseCase } from "../usercases/role/get-role.usecase";
import { GetAllRolesUseCase } from "../usercases/role/getall-role.usecase";
import { DeleteRoleUseCase } from "../usercases/role/delete-role.usecase";
import { UpdateRoleUseCase } from "../usercases/role/update-role.usecase";
import { RoleController } from "../controllers/role.controller";
import { RoleRoutes } from "../routes/role.routes";
import { GetAllUsersUseCase } from "../usercases/user/getAll-user.usecase";
import { CustomerRepositoryInterface } from "../domain/repositories/customer.repository.interface";
import { CustomerRepositoryImpl } from "../repositories/customer.repository";
import { CustomerServiceInterface } from "../interfaces/customer.service.interface";
import { CustomerServiceImpl } from "../services/customer.service";
import { CreateCustomerUseCase } from "../usercases/customer/create-customer.usecase";
import { GetCustomerUseCase } from "../usercases/customer/get-customer.usecase";
import { GetAllCustomersUseCase } from "../usercases/customer/getall-customers.usecase";
import { DeleteCustomerUseCase } from "../usercases/customer/delete-customer.usecase";
import { UpdateCustomerUseCase } from "../usercases/customer/update-customer.usecase";
import { GetCustomerByUserIdUseCase } from "../usercases/customer/get-customer-by-userid.usecase";
import { CustomerController } from "../controllers/customer.controller";
import { CustomerRoutes } from "../routes/customer.routes";

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
container
  .bind<ActivityRepositoryInterface>(TYPES.ActivityRepository)
  .to(ActivityRepositoryImpl)
  .inSingletonScope();
container
  .bind<RoleRepositoryInterface>(TYPES.RoleRepository)
  .to(RoleRepositoryImpl)
  .inSingletonScope();
container
  .bind<CustomerRepositoryInterface>(TYPES.CustomerRepository)
  .to(CustomerRepositoryImpl)
  .inSingletonScope();

// Services
container.bind<UserServiceInterface>(TYPES.UserService).to(UserServiceImpl);
container
  .bind<CategoryServiceInterface>(TYPES.CategoryService)
  .to(CategoryServiceImpl);
container
  .bind<InventoryServiceInterface>(TYPES.InventoryService)
  .to(InventoryServiceImpl);
container
  .bind<ActivityServiceInterface>(TYPES.ActivityService)
  .to(ActivityServiceImpl);
container.bind<RoleServiceInterface>(TYPES.RoleService).to(RoleServiceImpl);
container
  .bind<CustomerServiceInterface>(TYPES.CustomerService)
  .to(CustomerServiceImpl);

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
  .bind<GetAllUsersUseCase>(TYPES.GetAllUsersUseCase)
  .to(GetAllUsersUseCase);

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

container
  .bind<CreateActivityUseCase>(TYPES.CreateActivityUseCase)
  .to(CreateActivityUseCase);
container
  .bind<GetActivityUseCase>(TYPES.GetActivityUseCase)
  .to(GetActivityUseCase);
container
  .bind<GetAllActivityUseCase>(TYPES.GetAllActivitiesUseCase)
  .to(GetAllActivityUseCase);
container
  .bind<DeleteActivityUseCase>(TYPES.DeleteActivityUseCase)
  .to(DeleteActivityUseCase);
container
  .bind<UpdateActivityUseCase>(TYPES.UpdateActivityUseCase)
  .to(UpdateActivityUseCase);

container
  .bind<CreateRoleUseCase>(TYPES.CreateRoleUseCase)
  .to(CreateRoleUseCase);
container.bind<GetRoleUseCase>(TYPES.GetRoleUseCase).to(GetRoleUseCase);
container
  .bind<GetAllRolesUseCase>(TYPES.GetAllRolesUseCase)
  .to(GetAllRolesUseCase);
container
  .bind<DeleteRoleUseCase>(TYPES.DeleteRoleUseCase)
  .to(DeleteRoleUseCase);
container
  .bind<UpdateRoleUseCase>(TYPES.UpdateRoleUseCase)
  .to(UpdateRoleUseCase);

container
  .bind<CreateCustomerUseCase>(TYPES.CreateCustomerUseCase)
  .to(CreateCustomerUseCase);
container
  .bind<GetCustomerUseCase>(TYPES.GetCustomerUseCase)
  .to(GetCustomerUseCase);
container
  .bind<GetAllCustomersUseCase>(TYPES.GetAllCustomersUseCase)
  .to(GetAllCustomersUseCase);
container
  .bind<DeleteCustomerUseCase>(TYPES.DeleteCustomerUseCase)
  .to(DeleteCustomerUseCase);
container
  .bind<UpdateCustomerUseCase>(TYPES.UpdateCustomerUseCase)
  .to(UpdateCustomerUseCase);
container
  .bind<GetCustomerByUserIdUseCase>(TYPES.GetCustomerByUserIdUseCase)
  .to(GetCustomerByUserIdUseCase);

// Controllers
container.bind<UserController>(TYPES.UserController).to(UserController);
container
  .bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController);
container
  .bind<InventoryController>(TYPES.InventoryController)
  .to(InventoryController);
container
  .bind<ActivityController>(TYPES.ActivityController)
  .to(ActivityController);
container.bind<RoleController>(TYPES.RoleController).to(RoleController);
container
  .bind<CustomerController>(TYPES.CustomerController)
  .to(CustomerController);

// Routes
container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
container.bind<CategoryRoutes>(TYPES.CategoryRoutes).to(CategoryRoutes);
container.bind<InventoryRoutes>(TYPES.InventoryRoutes).to(InventoryRoutes);
container.bind<ActivityRoutes>(TYPES.ActivityRoutes).to(ActivityRoutes);
container.bind<RoleRoutes>(TYPES.RoleRoutes).to(RoleRoutes);
container.bind<CustomerRoutes>(TYPES.CustomerRoutes).to(CustomerRoutes);

export { container };
