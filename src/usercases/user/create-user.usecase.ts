import { User } from "domain/models/user.model";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserServiceInterface
  ) {}

  async execute(user: User): Promise<User> {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }
}
