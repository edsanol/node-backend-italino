export interface IUserDto {
  userId?: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
  userStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  roleId?: number;
}
