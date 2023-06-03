import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { ActivityServiceInterface } from "../../interfaces/activity.service.interface";
import { IActivityDto } from "../../dto/activityDto";

@injectable()
export class UpdateActivityUseCase {
  constructor(
    @inject(TYPES.ActivityService)
    private readonly activityService: ActivityServiceInterface
  ) {}

  async execute(idActivity: number, activity: IActivityDto) {
    const isUpdated = await this.activityService.updateActivity(
      idActivity,
      activity
    );
    return isUpdated;
  }
}
