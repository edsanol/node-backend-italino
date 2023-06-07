import { Request, Response } from "express";
import { CreateUserUseCase } from "../usercases/user/create-user.usecase";
import { GetUserUseCase } from "../usercases/user/get-user.usecase";
import { UpdateUserUseCase } from "../usercases/user/update-user.usecase";
import { DeleteUserUseCase } from "../usercases/user/delete-user.usecase";
import { User } from "../domain/models/user.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";
import { IUserDto } from "../dto/userDto";
import { GetAllUsersUseCase } from "../usercases/user/getAll-user.usecase";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
    @inject(TYPES.GetUserUseCase)
    private getUserUseCase: GetUserUseCase,
    @inject(TYPES.UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
    @inject(TYPES.DeleteUserUseCase)
    private deleteUserUseCase: DeleteUserUseCase,
    @inject(TYPES.GetAllUsersUseCase)
    private getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUserDto = req.body;
      const newUser = await this.createUserUseCase.execute(user);
      res.status(201).json({
        success: true,
        message: "User created",
        data: newUser,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error creating user ${error.message}`,
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const user = await this.getUserUseCase.execute(userId);
      if (user) {
        res.status(201).json({
          success: true,
          message: "User",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
          error: "User not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting user ${error.message}`,
      });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await this.getAllUsersUseCase.execute();
      res.status(201).json({
        success: true,
        message: "All users",
        data: allUsers,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting all users ${error.message}`,
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const data: Partial<IUserDto> = req.body;
      const isUpdated = await this.updateUserUseCase.execute(userId, data);
      if (isUpdated) {
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: isUpdated,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
          error: "User not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error updating user ${error.message}`,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const isDeleted = await this.deleteUserUseCase.execute(userId);
      if (isDeleted) {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          data: isDeleted,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
          error: "User not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error deleting user ${error.message}`,
      });
    }
  }
}
