import { User } from "domain/models/user.model";
import { UserServiceInterface } from "../../interfaces/user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import { IUserDto } from "../../dto/userDto";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserServiceInterface
  ) {}

  async execute(user: IUserDto): Promise<User> {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }
}
