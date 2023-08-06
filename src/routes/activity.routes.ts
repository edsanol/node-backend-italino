import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { ActivityController } from "../controllers/activity.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class ActivityRoutes {
  constructor(
    @inject(TYPES.ActivityController)
    private activityController: ActivityController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/activity",
      this.activityController.createActivity.bind(this.activityController)
    );

    router.get(
      "/activity",
      validateJWT,
      this.activityController.getAllActivities.bind(this.activityController)
    );

    router.get(
      "/activity/:idActivity",
      validateJWT,
      this.activityController.getActivity.bind(this.activityController)
    );

    router.put(
      "/activity/:idActivity",
      validateJWT,
      this.activityController.updateActivity.bind(this.activityController)
    );

    router.delete(
      "/activity/:idActivity",
      validateJWT,
      this.activityController.deleteActivity.bind(this.activityController)
    );
  }
}
