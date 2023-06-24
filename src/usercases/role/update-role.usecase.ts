import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/role.service.interface";
import { IRoleDto } from "../../dto/roleDto";
import { Role } from "../../domain/models/role.model";

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject(TYPES.RoleService)
    private readonly roleService: RoleServiceInterface
  ) {}

  async execute(idRole: number, role: IRoleDto): Promise<Role> {
    const isUpdated = await this.roleService.updateRole(idRole, role);
    return isUpdated;
  }
}
