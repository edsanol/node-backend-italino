import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { ActivityServiceInterface } from "../../interfaces/activity.service.interface";

@injectable()
export class DeleteActivityUseCase {
  constructor(
    @inject(TYPES.ActivityService)
    private readonly activityService: ActivityServiceInterface
  ) {}

  async execute(idActivity: number) {
    const isDeleted = await this.activityService.deleteActivity(idActivity);
    return isDeleted;
  }
}
