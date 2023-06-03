import { Role } from "../models/role.model";
import { IRoleDto } from "../../dto/roleDto";

export interface RoleRepositoryInterface {
  createRole(role: IRoleDto): Promise<Role>;
  getAllRoles(): Promise<Role[] | null>;
  getRoleById(idRole: number): Promise<Role[] | null>;
  updateRole(idRole: number, role: IRoleDto): Promise<boolean>;
  deleteRole(idRole: number): Promise<boolean>;
}
