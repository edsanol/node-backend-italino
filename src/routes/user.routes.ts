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
    /**
     * @openapi
     * /createUser:
     *  post:
     *     tags:
     *     - createUser
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    router.post(
      "/users",
      this.userController.createUser.bind(this.userController)
    );
    /**
     * @openapi
     * /getUser:
     *  get:
     *     tags:
     *     - getUser
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    router.get(
      "/users/:userId",
      this.userController.getUser.bind(this.userController)
    );
    /**
     * @openapi
     * /updateUser:
     *  patch:
     *     tags:
     *     - updateUser
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
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
