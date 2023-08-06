import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateRoleUseCase } from "../usercases/role/create-role.usecase";
import { GetAllRolesUseCase } from "../usercases/role/getall-role.usecase";
import { GetRoleUseCase } from "../usercases/role/get-role.usecase";
import { UpdateRoleUseCase } from "../usercases/role/update-role.usecase";
import { DeleteRoleUseCase } from "../usercases/role/delete-role.usecase";
import { IRoleDto } from "../dto/roleDto";
import { Request, Response } from "express";
import { RequestToToken } from "../interfaces/token.interface";

@injectable()
export class RoleController {
  constructor(
    @inject(TYPES.CreateRoleUseCase)
    private readonly createRoleUseCase: CreateRoleUseCase,
    @inject(TYPES.GetAllRolesUseCase)
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
    @inject(TYPES.GetRoleUseCase)
    private readonly getRoleUseCase: GetRoleUseCase,
    @inject(TYPES.UpdateRoleUseCase)
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    @inject(TYPES.DeleteRoleUseCase)
    private readonly deleteRoleUseCase: DeleteRoleUseCase
  ) {}

  async createRole(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const role: IRoleDto = req.body;
      const newRole = await this.createRoleUseCase.execute(role);
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: newRole,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating role",
        error: `Error creating role ${error.message}`,
      });
    }
  }

  async getAllRoles(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const allRoles = await this.getAllRolesUseCase.execute();
      res.status(200).json({
        success: true,
        message: "All roles",
        data: allRoles,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error getting all roles",
        error: `Error getting all roles ${error.message}`,
      });
    }
  }

  async getRole(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idRole = Number(req.params.idRole);
      const role = await this.getRoleUseCase.execute(idRole);
      res.status(200).json({
        success: true,
        message: "Role",
        data: role,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error getting role",
        error: `Error getting role ${error.message}`,
      });
    }
  }

  async updateRole(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idRole = Number(req.params.idRole);
      const role: IRoleDto = req.body;
      const roleUpdated = await this.updateRoleUseCase.execute(idRole, role);
      res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: roleUpdated,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating role",
        error: `Error updating role ${error.message}`,
      });
    }
  }

  async deleteRole(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const idRole = Number(req.params.idRole);
      const roleDeleted = await this.deleteRoleUseCase.execute(idRole);
      res.status(200).json({
        success: true,
        message: "Role deleted successfully",
        data: roleDeleted,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting role",
        error: `Error deleting role ${error.message}`,
      });
    }
  }
}
