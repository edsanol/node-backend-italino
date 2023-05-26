import { User } from "../models/user.model";

export interface UserRepositoryInterface {
  createUser(user: User): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  updateUser(userId: number, data: Partial<User>): Promise<boolean>;
  deleteUser(userId: number): Promise<boolean>;
}
