import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { RoleController } from "../controllers/role.controller";
import { Router } from "express";

@injectable()
export class RoleRoutes {
  constructor(
    @inject(TYPES.RoleController)
    private roleController: RoleController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/role",
      this.roleController.createRole.bind(this.roleController)
    );

    router.get(
      "/role",
      this.roleController.getAllRoles.bind(this.roleController)
    );

    router.get(
      "/role/:idRole",
      this.roleController.getRole.bind(this.roleController)
    );

    router.put(
      "/role/:idRole",
      this.roleController.updateRole.bind(this.roleController)
    );

    router.delete(
      "/role/:idRole",
      this.roleController.deleteRole.bind(this.roleController)
    );
  }
}
