export interface IRoleDto {
  roleId?: number;
  roleName: string;
  roleDescription: string;
  roleStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  activityId: number[];
}
