import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { User } from "../../domain/models/user.model";

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(email: string): Promise<User> {
    const forgotPassword = await this.userService.forgotPassword(email);
    return forgotPassword;
  }
}
