import { IRoleDto } from "../dto/roleDto";
import { Role } from "../domain/models/role.model";

export interface RoleServiceInterface {
  createRole(role: IRoleDto): Promise<Role>;
  getAllRoles(): Promise<Role[] | null>;
  getRoleById(idRole: number): Promise<Role[] | null>;
  updateRole(idRole: number, role: IRoleDto): Promise<Role>;
  deleteRole(idRole: number): Promise<boolean>;
}
