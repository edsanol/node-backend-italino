import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { User } from "../../domain/models/user.model";

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(token: string, newPassword: string): Promise<User> {
    const isUpdated = await this.userService.resetPassword(token, newPassword);
    return isUpdated;
  }
}
