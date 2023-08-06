export interface IUserDto {
  userId?: number;
  nameUser: string;
  phoneUser: string;
  emailUser: string;
  passwordUser: string;
  statusUser: string;
  createdAt?: Date;
  updatedAt?: Date;
  roleId?: number;
}
