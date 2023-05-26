import { User } from "domain/models/user.model";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(userId: number, data: Partial<User>): Promise<boolean> {
    const isUpdated = await this.userService.updateUser(userId, data);
    return isUpdated;
  }
}
