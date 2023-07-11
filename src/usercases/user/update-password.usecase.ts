import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { User } from "../../domain/models/user.model";

@injectable()
export class UpdatePasswordUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<User> {
    const isUpdated = await this.userService.updatePassword(
      userId,
      password,
      newPassword
    );
    return isUpdated;
  }
}
