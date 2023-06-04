import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import { IUserDto } from "../../dto/userDto";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(userId: number, data: Partial<IUserDto>): Promise<boolean> {
    const isUpdated = await this.userService.updateUser(userId, data);
    return isUpdated;
  }
}
