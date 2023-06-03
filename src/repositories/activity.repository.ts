import { ActivityRepositoryInterface } from "../domain/repositories/activity.repository.interface";
import { IActivityDto } from "../dto/activityDto";
import { Activity } from "../domain/models/activity.model";
import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";

@injectable()
export class ActivityRepositoryImpl implements ActivityRepositoryInterface {
  private readonly db: Repository<Activity>;

  constructor() {
    this.db = AppDataSource.getRepository(Activity);
  }

  async createActivity(activity: IActivityDto): Promise<Activity> {
    const newActivity = new Activity();
    newActivity.name_activity = activity.activityName;
    newActivity.description_activity = activity.activityDescription;
    newActivity.status_activity = activity.activityStatus;
    newActivity.created_at = new Date();
    newActivity.updated_at = new Date();

    return this.db.manager.save(newActivity);
  }
  async getAllActivities(): Promise<Activity[] | null> {
    const allActivities = await this.db.find();

    if (!allActivities) {
      return null;
    }

    return allActivities;
  }
  async getActivityById(idActivity: number): Promise<Activity | null> {
    const activityById = await this.db.findOneBy({ id_activity: idActivity });

    if (!activityById) {
      return null;
    }

    return activityById;
  }
  async updateActivity(
    idActivity: number,
    activity: IActivityDto
  ): Promise<boolean> {
    const activityToUpdate = await this.db.findOneBy({
      id_activity: idActivity,
    });

    if (!activityToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...activityToUpdate, ...activity });

    return Promise.resolve(true);
  }
  async deleteActivity(idActivity: number): Promise<boolean> {
    const activityToDelete = await this.db.findOneBy({
      id_activity: idActivity,
    });

    if (!activityToDelete) {
      return false;
    }

    await this.db.manager.remove(activityToDelete);

    return Promise.resolve(true);
  }
}
