import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/role.service.interface";
import { TYPES } from "../../config/types";
import { Role } from "../../domain/models/role.model";

@injectable()
export class GetRoleUseCase {
  constructor(
    @inject(TYPES.RoleService)
    private readonly roleService: RoleServiceInterface
  ) {}

  async execute(idRole: number): Promise<Role[] | null> {
    const role = await this.roleService.getRoleById(idRole);
    return role;
  }
}
