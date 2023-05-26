import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController) private userController: UserController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/users",
      this.userController.createUser.bind(this.userController)
    );
    router.get(
      "/users/:userId",
      this.userController.getUser.bind(this.userController)
    );
    router.patch(
      "/users/:userId",
      this.userController.updateUser.bind(this.userController)
    );
    router.delete(
      "/users/:userId",
      this.userController.deleteUser.bind(this.userController)
    );
  }
}
