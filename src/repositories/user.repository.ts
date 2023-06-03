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
    newUser.name_user = user.name_user;
    newUser.phone_user = user.phone_user;
    newUser.password_user = user.password_user;
    newUser.status_user = user.status_user;
    newUser.email_user = user.email_user;

    return this.db.manager.save(newUser);
  }
  async getUserById(userId: number): Promise<User | null> {
    const userById = await this.db.findOneBy({ id_user: userId });

    if (!userById) {
      return null;
    }

    return userById;
  }
  async updateUser(userId: number, data: Partial<User>): Promise<boolean> {
    const userToUpdate = await this.db.findOneBy({ id_user: userId });

    if (!userToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...userToUpdate, ...data });

    return Promise.resolve(true);
  }
  async deleteUser(userId: number): Promise<boolean> {
    const userToDelete = await this.db.findOneBy({ id_user: userId });

    if (!userToDelete) {
      return false;
    }

    await this.db.manager.remove(userToDelete);

    return Promise.resolve(true);
  }
}
