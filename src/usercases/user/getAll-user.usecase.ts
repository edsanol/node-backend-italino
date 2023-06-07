import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { User } from "../../domain/models/user.model";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserServiceInterface
  ) {}

  async execute(): Promise<User[] | null> {
    const allUsers = await this.userService.getAllUsers();
    return allUsers;
  }
}
