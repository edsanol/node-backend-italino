import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/role.service.interface";
import { IRoleDto } from "../../dto/roleDto";
import { Role } from "../../domain/models/role.model";

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject(TYPES.RoleService)
    private readonly roleService: RoleServiceInterface
  ) {}

  async execute(role: IRoleDto): Promise<Role> {
    const newRole = await this.roleService.createRole(role);
    return newRole;
  }
}
