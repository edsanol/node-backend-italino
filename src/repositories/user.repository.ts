import { AppDataSource } from "../db";
import { User } from "../domain/models/user.model";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { Repository } from "typeorm";
import { injectable } from "inversify";
import { IUserDto } from "../dto/userDto";
import { Role } from "../domain/models/role.model";

@injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
  private readonly db: Repository<User>;
  private readonly dbRole: Repository<Role>;

  constructor() {
    this.db = AppDataSource.getRepository(User);
    this.dbRole = AppDataSource.getRepository(Role);
  }

  async createUser(user: IUserDto): Promise<User | null> {
    const role = await this.dbRole.findOneByOrFail({ id_role: user.roleId });

    const newUser = new User();
    newUser.name_user = user.userName;
    newUser.phone_user = user.userPhone;
    newUser.password_user = user.userPassword;
    newUser.status_user = user.userStatus;
    newUser.email_user = user.userEmail;
    newUser.created_at = new Date();
    newUser.updated_at = new Date();
    newUser.rol = role;

    const userCreated = await this.db.manager.save(newUser);

    const userById = await this.db
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.rol", "rol")
      .where("user.id_user = :id_user", { id_user: userCreated.id_user })
      .leftJoinAndSelect("rol.activities", "activities")
      .getOne();

    if (!userById) {
      return null;
    }

    const result: any = {
      id_user: userById.id_user,
      name_user: userById.name_user,
      phone_user: userById.phone_user,
      email_user: userById.email_user,
      status_user: userById.status_user,
      rol: {
        id_role: userById.rol.id_role,
        name_role: userById.rol.name_role,
        description_role: userById.rol.description_role,
        status_role: userById.rol.status_role,
        activities: userById.rol.activities.map((activity) => ({
          id_activity: activity.id_activity,
          name_activity: activity.name_activity,
          description_activity: activity.description_activity,
          status_activity: activity.status_activity,
        })),
      },
    };

    return result;
  }
  async getUserById(userId: number): Promise<User | null> {
    const userById = await this.db
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.rol", "rol")
      .where("user.id_user = :id_user", { id_user: userId })
      .leftJoinAndSelect("rol.activities", "activities")
      .getOne();

    if (!userById) {
      return null;
    }

    const result: any = {
      id_user: userById.id_user,
      name_user: userById.name_user,
      phone_user: userById.phone_user,
      email_user: userById.email_user,
      status_user: userById.status_user,
      rol: {
        id_role: userById.rol.id_role,
        name_role: userById.rol.name_role,
        description_role: userById.rol.description_role,
        status_role: userById.rol.status_role,
        activities: userById.rol.activities.map((activity) => ({
          id_activity: activity.id_activity,
          name_activity: activity.name_activity,
          description_activity: activity.description_activity,
          status_activity: activity.status_activity,
        })),
      },
    };

    return result;
  }
  async updateUser(userId: number, data: Partial<IUserDto>): Promise<boolean> {
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
