import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/role.service.interface";
import { TYPES } from "../../config/types";
import { Role } from "../../domain/models/role.model";

@injectable()
export class GetAllRolesUseCase {
  constructor(
    @inject(TYPES.RoleService)
    private readonly roleService: RoleServiceInterface
  ) {}

  async execute(): Promise<Role[] | null> {
    const allRoles = await this.roleService.getAllRoles();
    return allRoles;
  }
}
