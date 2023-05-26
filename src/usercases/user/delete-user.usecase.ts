import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(userId: number): Promise<boolean> {
    const isDeleted = await this.userService.deleteUser(userId);
    return isDeleted;
  }
}
