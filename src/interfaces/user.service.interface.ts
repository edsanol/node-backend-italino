import { User } from "domain/models/user.model";

export interface UserServiceInterface {
  createUser(user: User): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  updateUser(userId: number, data: Partial<User>): Promise<boolean>;
  deleteUser(userId: number): Promise<boolean>;
}
