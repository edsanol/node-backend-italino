import { User } from "domain/models/user.model";
import { UserServiceInterface } from "../interfaces/user.service.interface";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";
import { IUserDto } from "../dto/userDto";

@injectable()
export class UserServiceImpl implements UserServiceInterface {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepositoryInterface
  ) {}

  async loginUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.loginUser(email, password);
    return user;
  }

  async getAllUsers(): Promise<User[] | null> {
    const allUsers = await this.userRepository.getAllUsers();
    return allUsers;
  }

  async createUser(user: IUserDto): Promise<User | null> {
    const newUser = await this.userRepository.createUser(user);
    return newUser;
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }

  async updateUser(userId: number, data: IUserDto): Promise<User> {
    const isUpdated = await this.userRepository.updateUser(userId, data);
    return isUpdated;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const isDeleted = await this.userRepository.deleteUser(userId);
    return isDeleted;
  }

  async updatePassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<User> {
    const isUpdated = await this.userRepository.updatePassword(
      userId,
      password,
      newPassword
    );
    return isUpdated;
  }

  async forgotPassword(email: string): Promise<User> {
    const forgotPassword = await this.userRepository.forgotPassword(email);
    return forgotPassword;
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    const isUpdated = await this.userRepository.resetPassword(
      token,
      newPassword
    );
    return isUpdated;
  }
}
