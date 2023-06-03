import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { ActivityServiceInterface } from "../../interfaces/activity.service.interface";
import { IActivityDto } from "../../dto/activityDto";

@injectable()
export class CreateActivityUseCase {
  constructor(
    @inject(TYPES.ActivityService)
    private readonly activityService: ActivityServiceInterface
  ) {}

  async execute(activity: IActivityDto) {
    const newActivity = await this.activityService.createActivity(activity);
    return newActivity;
  }
}
