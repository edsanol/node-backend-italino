import { RoleServiceInterface } from "../interfaces/role.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { RoleRepositoryInterface } from "../domain/repositories/role.repository.interface";
import { IRoleDto } from "../dto/roleDto";
import { Role } from "../domain/models/role.model";

@injectable()
export class RoleServiceImpl implements RoleServiceInterface {
  constructor(
    @inject(TYPES.RoleRepository)
    private readonly roleRepository: RoleRepositoryInterface
  ) {}

  async createRole(role: IRoleDto): Promise<Role> {
    const newRole = await this.roleRepository.createRole(role);
    return newRole;
  }
  async getAllRoles(): Promise<Role[] | null> {
    const allRoles = await this.roleRepository.getAllRoles();
    return allRoles;
  }
  async getRoleById(idRole: number): Promise<Role[] | null> {
    const roleById = await this.roleRepository.getRoleById(idRole);
    return roleById;
  }
  async updateRole(idRole: number, role: IRoleDto): Promise<Role> {
    const isUpdated = await this.roleRepository.updateRole(idRole, role);
    return isUpdated;
  }
  async deleteRole(idRole: number): Promise<boolean> {
    const isDeleted = await this.roleRepository.deleteRole(idRole);
    return isDeleted;
  }
}
