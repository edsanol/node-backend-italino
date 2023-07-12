import { User } from "../models/user.model";
import { IUserDto } from "../../dto/userDto";

export interface UserRepositoryInterface {
  createUser(user: IUserDto): Promise<User | null>;
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[] | null>;
  updateUser(userId: number, data: IUserDto): Promise<User>;
  deleteUser(userId: number): Promise<boolean>;
  loginUser(email: string, password: string): Promise<User | null>;
  updatePassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<User>;
  forgotPassword(email: string): Promise<User>;
  resetPassword(token: string, newPassword: string): Promise<User>;
}
