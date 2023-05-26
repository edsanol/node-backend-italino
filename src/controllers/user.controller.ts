import { Request, Response } from "express";
import { CreateUserUseCase } from "../usercases/user/create-user.usecase";
import { GetUserUseCase } from "../usercases/user/get-user.usecase";
import { UpdateUserUseCase } from "../usercases/user/update-user.usecase";
import { DeleteUserUseCase } from "../usercases/user/delete-user.usecase";
import { User } from "../domain/models/user.model";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/types";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
    @inject(TYPES.GetUserUseCase) private getUserUseCase: GetUserUseCase,
    @inject(TYPES.UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
    @inject(TYPES.DeleteUserUseCase)
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = req.body;
      const newUser = await this.createUserUseCase.execute(user);
      console.log("newUser", newUser);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const user = await this.getUserUseCase.execute(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const data: Partial<User> = req.body;
      const isUpdated = await this.updateUserUseCase.execute(userId, data);
      if (isUpdated) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const isDeleted = await this.deleteUserUseCase.execute(userId);
      if (isDeleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
