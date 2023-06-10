import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../../interfaces/user.service.interface";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userService.loginUser(email, password);
    return user;
  }
}
