import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { ActivityController } from "../controllers/activity.controller";
import { Router } from "express";

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
      this.activityController.getAllActivities.bind(this.activityController)
    );

    router.get(
      "/activity/:idActivity",
      this.activityController.getActivity.bind(this.activityController)
    );

    router.put(
      "/activity/:idActivity",
      this.activityController.updateActivity.bind(this.activityController)
    );

    router.delete(
      "/activity/:idActivity",
      this.activityController.deleteActivity.bind(this.activityController)
    );
  }
}
