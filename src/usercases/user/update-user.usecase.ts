import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import { IUserDto } from "../../dto/userDto";
import { User } from "../../domain/models/user.model";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(TYPES.UserService) private userService: UserServiceInterface
  ) {}

  async execute(userId: number, data: IUserDto): Promise<User> {
    const isUpdated = await this.userService.updateUser(userId, data);
    return isUpdated;
  }
}
