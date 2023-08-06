export interface IRoleDto {
  idRole?: number;
  nameRole: string;
  descriptionRole: string;
  statusRole: string;
  createdAt?: Date;
  updatedAt?: Date;
  activities: number[];
}
