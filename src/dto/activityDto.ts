export interface IActivityDto {
  activityId?: number;
  activityName: string;
  activityDescription: string;
  activityStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  roleId?: number;
}
