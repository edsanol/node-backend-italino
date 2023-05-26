import { Container } from "inversify";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { UserRepositoryImpl } from "../repositories/user.repository";
import { UserServiceInterface } from "../interfaces/user.service.interface";
import { UserService } from "../services/user.service";
import { TYPES } from "./types";
import { CreateUserUseCase } from "../usercases/user/create-user.usecase";
import { GetUserUseCase } from "../usercases/user/get-user.usecase";
import { UpdateUserUseCase } from "../usercases/user/update-user.usecase";
import { DeleteUserUseCase } from "../usercases/user/delete-user.usecase";
import { UserController } from "../controllers/user.controller";
import { UserRoutes } from "../routes/user.routes";

const container = new Container();

// Repositories
container
  .bind<UserRepositoryInterface>(TYPES.UserRepository)
  .to(UserRepositoryImpl)
  .inSingletonScope();

// Services
container.bind<UserServiceInterface>(TYPES.UserService).to(UserService);

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

// Controllers
container.bind<UserController>(TYPES.UserController).to(UserController);

// Routes
container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);

export { container };
