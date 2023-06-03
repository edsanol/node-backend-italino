import { IActivityDto } from "../dto/activityDto";
import { ActivityServiceInterface } from "../interfaces/activity.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { ActivityRepositoryInterface } from "../domain/repositories/activity.repository.interface";
import { Activity } from "../domain/models/activity.model";

@injectable()
export class ActivityServiceImpl implements ActivityServiceInterface {
  constructor(
    @inject(TYPES.ActivityRepository)
    private readonly activityRepository: ActivityRepositoryInterface
  ) {}

  async createActivity(activity: IActivityDto): Promise<Activity> {
    const newActivity = await this.activityRepository.createActivity(activity);
    return newActivity;
  }
  async getAllActivities(): Promise<Activity[] | null> {
    const allActivities = await this.activityRepository.getAllActivities();
    return allActivities;
  }
  async getActivityById(idActivity: number): Promise<Activity | null> {
    const activityById = await this.activityRepository.getActivityById(
      idActivity
    );
    return activityById;
  }
  async updateActivity(
    idActivity: number,
    activity: IActivityDto
  ): Promise<boolean> {
    const isUpdated = await this.activityRepository.updateActivity(
      idActivity,
      activity
    );
    return isUpdated;
  }
  async deleteActivity(idActivity: number): Promise<boolean> {
    const isDeleted = await this.activityRepository.deleteActivity(idActivity);
    return isDeleted;
  }
}
