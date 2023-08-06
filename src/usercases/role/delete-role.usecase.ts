import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/role.service.interface";
import { TYPES } from "../../config/types";

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject(TYPES.RoleService)
    private readonly roleService: RoleServiceInterface
  ) {}

  async execute(idRole: number): Promise<boolean> {
    const isDeleted = await this.roleService.deleteRole(idRole);
    return isDeleted;
  }
}
