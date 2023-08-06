import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { ActivityServiceInterface } from "../../interfaces/activity.service.interface";

@injectable()
export class GetAllActivityUseCase {
  constructor(
    @inject(TYPES.ActivityService)
    private readonly activityService: ActivityServiceInterface
  ) {}

  async execute() {
    const allActivities = await this.activityService.getAllActivities();
    return allActivities;
  }
}
