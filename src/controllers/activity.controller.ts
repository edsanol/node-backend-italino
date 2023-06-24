import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateActivityUseCase } from "../usercases/activity/create-activity.usecase";
import { GetAllActivityUseCase } from "../usercases/activity/getall-activity.usecase";
import { GetActivityUseCase } from "../usercases/activity/get-activity.usecase";
import { UpdateActivityUseCase } from "../usercases/activity/update-activity.usecase";
import { DeleteActivityUseCase } from "../usercases/activity/delete-activity.usecase";
import { Request, Response } from "express";
import { IActivityDto } from "../dto/activityDto";
import { RequestToToken } from "../interfaces/token.interface";

@injectable()
export class ActivityController {
  constructor(
    @inject(TYPES.CreateActivityUseCase)
    private readonly createActivityUseCase: CreateActivityUseCase,
    @inject(TYPES.GetAllActivitiesUseCase)
    private readonly getAllActivitiesUseCase: GetAllActivityUseCase,
    @inject(TYPES.GetActivityUseCase)
    private readonly getActivityUseCase: GetActivityUseCase,
    @inject(TYPES.UpdateActivityUseCase)
    private readonly updateActivityUseCase: UpdateActivityUseCase,
    @inject(TYPES.DeleteActivityUseCase)
    private readonly deleteActivityUseCase: DeleteActivityUseCase
  ) {}

  async createActivity(req: RequestToToken, res: Response): Promise<void> {
    try {
      const activity: IActivityDto = req.body;
      const newActivity = await this.createActivityUseCase.execute(activity);
      res.status(201).json({
        success: true,
        message: "Activity created successfully",
        data: newActivity,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating activity",
        error: `Error creating activity ${error.message}`,
      });
    }
  }

  async getAllActivities(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const allActivities = await this.getAllActivitiesUseCase.execute();
      res.status(200).json({
        success: true,
        message: "Activities obtained successfully",
        data: allActivities,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error obtaining activities",
        error: `Error obtaining activities ${error.message}`,
      });
    }
  }

  async getActivity(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idActivity = Number(req.params.idActivity);
      const activity = await this.getActivityUseCase.execute(idActivity);
      res.status(200).json({
        success: true,
        message: "Activity obtained successfully",
        data: activity,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error obtaining activity",
        error: `Error obtaining activity ${error.message}`,
      });
    }
  }

  async updateActivity(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idActivity = Number(req.params.idActivity);
      const activity: IActivityDto = req.body;
      const isUpdated = await this.updateActivityUseCase.execute(
        idActivity,
        activity
      );
      res.status(200).json({
        success: true,
        message: "Activity updated successfully",
        data: isUpdated,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating activity",
        error: `Error updating activity ${error.message}`,
      });
    }
  }

  async deleteActivity(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idActivity = Number(req.params.idActivity);
      const isDeleted = await this.deleteActivityUseCase.execute(idActivity);
      res.status(200).json({
        success: true,
        message: "Activity deleted successfully",
        data: isDeleted,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting activity",
        error: `Error deleting activity ${error.message}`,
      });
    }
  }
}
