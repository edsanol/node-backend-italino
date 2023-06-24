import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { RoleController } from "../controllers/role.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class RoleRoutes {
  constructor(
    @inject(TYPES.RoleController)
    private roleController: RoleController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/role",
      validateJWT,
      this.roleController.createRole.bind(this.roleController)
    );

    router.get(
      "/role",
      validateJWT,
      this.roleController.getAllRoles.bind(this.roleController)
    );

    router.get(
      "/role/:idRole",
      validateJWT,
      this.roleController.getRole.bind(this.roleController)
    );

    router.put(
      "/role/:idRole",
      validateJWT,
      this.roleController.updateRole.bind(this.roleController)
    );

    router.delete(
      "/role/:idRole",
      validateJWT,
      this.roleController.deleteRole.bind(this.roleController)
    );
  }
}
