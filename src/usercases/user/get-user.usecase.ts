import { User } from "domain/models/user.model";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(userId: number): Promise<User | null> {
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
