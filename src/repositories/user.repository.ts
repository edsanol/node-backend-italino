import { AppDataSource } from "../db";
import { User } from "../domain/models/user.model";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { Repository } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
  private readonly db: Repository<User>;

  constructor() {
    this.db = AppDataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.phone = user.phone;
    newUser.password = user.password;
    newUser.status = user.status;

    return this.db.manager.save(newUser);
  }
  async getUserById(userId: number): Promise<User | null> {
    const userById = await this.db.findOneBy({ id: userId });

    if (!userById) {
      return null;
    }

    return userById;
  }
  async updateUser(userId: number, data: Partial<User>): Promise<boolean> {
    const userToUpdate = await this.db.findOneBy({ id: userId });

    if (!userToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...userToUpdate, ...data });

    return Promise.resolve(true);
  }
  async deleteUser(userId: number): Promise<boolean> {
    const userToDelete = await this.db.findOneBy({ id: userId });

    if (!userToDelete) {
      return false;
    }

    await this.db.manager.remove(userToDelete);

    return Promise.resolve(true);
  }
}
