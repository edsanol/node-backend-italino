import { AppDataSource } from "../db";
import { User } from "../domain/models/user.model";
import { UserRepositoryInterface } from "../domain/repositories/user.repository.interface";
import { Repository } from "typeorm";
import { injectable } from "inversify";
import { IUserDto } from "../dto/userDto";
import { Role } from "../domain/models/role.model";
import bcrypt from "bcrypt";

@injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
  private readonly db: Repository<User>;
  private readonly dbRole: Repository<Role>;

  constructor() {
    this.db = AppDataSource.getRepository(User);
    this.dbRole = AppDataSource.getRepository(Role);
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const userByEmail = await this.db
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.rol", "rol")
      .where("user.email_user = :email_user", { email_user: email })
      .leftJoinAndSelect("rol.activities", "activities")
      .getOne();

    if (!userByEmail) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, userByEmail.password_user);

    if (!isMatch) {
      return null;
    }

    return userByEmail;
  }

  async getAllUsers(): Promise<User[] | null> {
    const allUsers = await this.db
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.rol", "rol")
      .getMany();

    if (!allUsers) {
      return null;
    }

    return allUsers;
  }

  async createUser(user: IUserDto): Promise<User | null> {
    const role = await this.dbRole.findOneByOrFail({ id_role: user.roleId });

    // Encrypta la contraseña
    const encryptPassword = await bcrypt.hash(user.passwordUser, 8);

    const newUser = new User();
    newUser.name_user = user.nameUser;
    newUser.phone_user = user.phoneUser;
    newUser.password_user = encryptPassword;
    newUser.status_user = user.statusUser;
    newUser.email_user = user.emailUser;
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
  async updateUser(userId: number, data: IUserDto): Promise<User> {
    const userToUpdate = await this.db.findOneByOrFail({ id_user: userId });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    userToUpdate.id_user = userId;
    userToUpdate.name_user = data.nameUser;
    userToUpdate.phone_user = data.phoneUser;
    userToUpdate.email_user = data.emailUser;
    userToUpdate.status_user = data.statusUser;
    userToUpdate.rol = await this.dbRole.findOneByOrFail({
      id_role: data.roleId,
    });
    userToUpdate.updated_at = new Date();

    await this.db.manager.save(userToUpdate);

    const userById = await this.db
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.rol", "rol")
      .where("user.id_user = :id_user", { id_user: userId })
      .leftJoinAndSelect("rol.activities", "activities")
      .getOne();

    if (!userById) {
      throw new Error("User not found");
    }

    const result: any = {
      id_user: userById.id_user,
      name_user: userById.name_user,
      phone_user: userById.phone_user,
      email_user: userById.email_user,
      status_user: userById.status_user,
      created_at: userById.created_at,
      updated_at: userById.updated_at,
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
  async deleteUser(userId: number): Promise<boolean> {
    const userToDelete = await this.db.findOneBy({ id_user: userId });

    if (!userToDelete) {
      return false;
    }

    await this.db.manager.remove(userToDelete);

    return Promise.resolve(true);
  }
}
