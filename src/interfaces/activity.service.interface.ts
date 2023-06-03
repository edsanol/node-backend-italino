import { IActivityDto } from "../dto/activityDto";
import { Activity } from "../domain/models/activity.model";

export interface ActivityServiceInterface {
  createActivity(activity: IActivityDto): Promise<Activity>;
  getAllActivities(): Promise<Activity[] | null>;
  getActivityById(idActivity: number): Promise<Activity | null>;
  updateActivity(idActivity: number, activity: IActivityDto): Promise<boolean>;
  deleteActivity(idActivity: number): Promise<boolean>;
}
