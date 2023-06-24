import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController)
    private userController: UserController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/users/login",
      this.userController.loginUser.bind(this.userController)
    );
    router.get(
      "/users/validate-token",
      validateJWT,
      this.userController.revalidateToken.bind(this.userController)
    );
    router.get(
      "/users",
      validateJWT,
      this.userController.getAllUsers.bind(this.userController)
    );
    router.post(
      "/users",
      validateJWT,
      this.userController.createUser.bind(this.userController)
    );
    router.get(
      "/users/:userId",
      validateJWT,
      this.userController.getUser.bind(this.userController)
    );
    router.put(
      "/users/:userId",
      validateJWT,
      this.userController.updateUser.bind(this.userController)
    );
    router.delete(
      "/users/:userId",
      validateJWT,
      this.userController.deleteUser.bind(this.userController)
    );
  }
}
