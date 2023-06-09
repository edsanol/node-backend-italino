import { Request, Response } from "express";
import { CreateUserUseCase } from "../usercases/user/create-user.usecase";
import { GetUserUseCase } from "../usercases/user/get-user.usecase";
import { UpdateUserUseCase } from "../usercases/user/update-user.usecase";
import { DeleteUserUseCase } from "../usercases/user/delete-user.usecase";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";
import { IUserDto } from "../dto/userDto";
import { GetAllUsersUseCase } from "../usercases/user/getAll-user.usecase";
import { LoginUserUseCase } from "../usercases/user/login-user.usecase";
import { generateToken } from "../utils/jwt";
import { RequestToToken } from "../interfaces/token.interface";
import { UpdatePasswordUseCase } from "../usercases/user/update-password.usecase";
import { transporter, forgoted } from "../utils/mailer";
import { ForgotPasswordUseCase } from "../usercases/user/forgot-password.usecase";
import { ResetPasswordUseCase } from "../usercases/user/reset-password.usecase";

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
    private getAllUsersUseCase: GetAllUsersUseCase,
    @inject(TYPES.LoginUserUseCase)
    private loginUserUseCase: LoginUserUseCase,
    @inject(TYPES.UpdatePasswordUseCase)
    private updatePasswordUseCase: UpdatePasswordUseCase,
    @inject(TYPES.ForgotPasswordUseCase)
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    @inject(TYPES.ResetPasswordUseCase)
    private resetPasswordUseCase: ResetPasswordUseCase
  ) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.loginUserUseCase.execute(email, password);
      if (user) {
        const token = await generateToken(user.id_user, user.rol.id_role);

        res.status(200).json({
          success: true,
          message: "User logged in",
          data: user,
          token,
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
        error: `Error logging in user ${error.message}`,
      });
    }
  }

  async revalidateToken(req: RequestToToken, res: Response): Promise<void> {
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

      const user = await this.getUserUseCase.execute(userId);
      if (user) {
        const token = await generateToken(userId, roleId);

        res.status(200).json({
          success: true,
          message: "Token revalidated",
          data: user,
          token,
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
        error: `Error revalidating token ${error.message}`,
      });
    }
  }

  async createUser(req: RequestToToken, res: Response): Promise<void> {
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

  async getUser(req: RequestToToken, res: Response): Promise<void> {
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

      const userIdFromParams: number = Number(req.params.userId);
      const user = await this.getUserUseCase.execute(userIdFromParams);
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

  async getAllUsers(req: RequestToToken, res: Response): Promise<void> {
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

  async updateUser(req: RequestToToken, res: Response): Promise<void> {
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

      const userIdFromParams: number = Number(req.params.userId);
      const data: IUserDto = req.body;
      const isUpdated = await this.updateUserUseCase.execute(
        userIdFromParams,
        data
      );
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

  async deleteUser(req: RequestToToken, res: Response): Promise<void> {
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

      const userIdFromParams: number = Number(req.params.userId);
      const isDeleted = await this.deleteUserUseCase.execute(userIdFromParams);
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

  async updatePassword(req: RequestToToken, res: Response): Promise<void> {
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

      const userIdFromParams: number = Number(req.params.userId);
      const password: string = req.body.password;
      const newPassword: string = req.body.newPassword;
      const isUpdated = await this.updatePasswordUseCase.execute(
        userIdFromParams,
        password,
        newPassword
      );
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

  async forgotPassword(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = await this.forgotPasswordUseCase.execute(email);

      if (user) {
        const token = await generateToken(user.id_user, user.rol.id_role);

        await transporter.sendMail(forgoted(user, token));

        res.status(200).json({
          success: true,
          message: "Email sent successfully",
          data: user,
          token,
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

  async resetPassword(req: RequestToToken, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      const resetPassword = await this.resetPasswordUseCase.execute(
        token,
        newPassword
      );

      if (resetPassword) {
        res.status(200).json({
          success: true,
          message: "Password reset successfully",
          data: resetPassword,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Password could not be updated",
          error: "Password could not be updated",
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
}
