import { User } from "domain/models/user.model";
import { IUserDto } from "../dto/userDto";

export interface UserServiceInterface {
  createUser(user: IUserDto): Promise<User | null>;
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[] | null>;
  updateUser(userId: number, data: Partial<IUserDto>): Promise<boolean>;
  deleteUser(userId: number): Promise<boolean>;
}
