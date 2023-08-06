import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { ActivityServiceInterface } from "../../interfaces/activity.service.interface";

@injectable()
export class GetActivityUseCase {
  constructor(
    @inject(TYPES.ActivityService)
    private readonly activityService: ActivityServiceInterface
  ) {}

  async execute(idActivity: number) {
    const activity = await this.activityService.getActivityById(idActivity);
    return activity;
  }
}
