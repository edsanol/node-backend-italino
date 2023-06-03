import { Role } from "../domain/models/role.model";
import { RoleRepositoryInterface } from "../domain/repositories/role.repository.interface";
import { injectable } from "inversify";
import { In, Repository } from "typeorm";
import { AppDataSource } from "../db";
import { Activity } from "../domain/models/activity.model";
import { IRoleDto } from "../dto/roleDto";

@injectable()
export class RoleRepositoryImpl implements RoleRepositoryInterface {
  private readonly db: Repository<Role>;
  private readonly dbActivities: Repository<Activity>;

  constructor() {
    this.db = AppDataSource.getRepository(Role);
    this.dbActivities = AppDataSource.getRepository(Activity);
  }

  async createRole(role: IRoleDto): Promise<Role> {
    const activity = await this.dbActivities.findBy({
      id_activity: In(role.activityId),
    });

    const newRole = new Role();
    newRole.name_role = role.roleName;
    newRole.description_role = role.roleDescription;
    newRole.status_role = role.roleStatus;
    newRole.created_at = new Date();
    newRole.updated_at = new Date();
    newRole.activities = activity;

    return this.db.manager.save(newRole);
  }
  async getAllRoles(): Promise<Role[] | null> {
    const allRoles = await this.db.find();

    if (!allRoles) {
      return null;
    }

    return allRoles;
  }
  async getRoleById(idRole: number): Promise<Role[] | null> {
    const roles = await this.db
      .createQueryBuilder("role")
      .leftJoinAndSelect("role.activities", "activity")
      .where("role.id_role = :idRole", { idRole: idRole })
      .getMany();

    if (!roles) {
      return null;
    }

    return roles;
  }
  async updateRole(idRole: number, role: IRoleDto): Promise<boolean> {
    const roleToUpdate = await this.db.findOneByOrFail({ id_role: idRole });

    if (!roleToUpdate) {
      return false;
    }

    roleToUpdate.name_role = role.roleName;
    roleToUpdate.description_role = role.roleDescription;
    roleToUpdate.status_role = role.roleStatus;
    roleToUpdate.updated_at = new Date();

    await this.db.manager.save(roleToUpdate);

    return Promise.resolve(true);
  }
  async deleteRole(idRole: number): Promise<boolean> {
    const roleToDelete = await this.db.findOneByOrFail({ id_role: idRole });

    if (!roleToDelete) {
      return false;
    }

    await this.db.manager.remove(roleToDelete);

    return Promise.resolve(true);
  }
}
