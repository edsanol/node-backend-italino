import { Activity } from "../models/activity.model";
import { IActivityDto } from "../../dto/activityDto";

export interface ActivityRepositoryInterface {
  createActivity(activity: IActivityDto): Promise<Activity>;
  getAllActivities(): Promise<Activity[] | null>;
  getActivityById(idActivity: number): Promise<Activity | null>;
  updateActivity(idActivity: number, activity: IActivityDto): Promise<boolean>;
  deleteActivity(idActivity: number): Promise<boolean>;
}
