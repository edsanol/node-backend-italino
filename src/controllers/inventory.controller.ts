import { inject, injectable } from "inversify";
import { CreateInventoryUseCase } from "../usercases/inventory/create-inventory.usecase";
import { TYPES } from "../config/types";
import { GetAllInventoriesUseCase } from "../usercases/inventory/getall-inventory.usecase";
import { GetInventoryUseCase } from "../usercases/inventory/get-inventory.usecase";
import { UpdateInventoryUseCase } from "../usercases/inventory/update-inventory.usecase";
import { DeleteInventoryUseCase } from "../usercases/inventory/delete-inventory.usecase";
import { Request, Response } from "express";
import { Inventory } from "../domain/models/inventory.model";
import { IInventoryDto } from "../dto/inventoryDto";

@injectable()
export class InventoryController {
  constructor(
    @inject(TYPES.CreateInventoryUseCase)
    private createInventoryUseCase: CreateInventoryUseCase,
    @inject(TYPES.GetAllInventoriesUseCase)
    private getAllInventoriesUseCase: GetAllInventoriesUseCase,
    @inject(TYPES.GetInventoryUseCase)
    private getInventoryUseCase: GetInventoryUseCase,
    @inject(TYPES.UpdateInventoryUseCase)
    private updateInventoryUseCase: UpdateInventoryUseCase,
    @inject(TYPES.DeleteInventoryUseCase)
    private deleteInventoryUseCase: DeleteInventoryUseCase
  ) {}

  async createInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventory: IInventoryDto = req.body;
      const newInventory = await this.createInventoryUseCase.execute(inventory);
      res.status(201).json({
        success: true,
        message: "Inventory created successfully",
        data: newInventory,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating inventory",
        error: error.message,
      });
    }
  }

  async getAllInventories(req: Request, res: Response): Promise<void> {
    try {
      const inventories = await this.getAllInventoriesUseCase.execute();
      res.status(200).json({
        success: true,
        message: "Inventories retrieved successfully",
        data: inventories,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error retrieving inventories",
        error: error.message,
      });
    }
  }

  async getInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: number = Number(req.params.inventoryId);
      const inventory = await this.getInventoryUseCase.execute(inventoryId);
      if (inventory) {
        res.status(200).json({
          success: true,
          message: "Inventory retrieved successfully",
          data: inventory,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Inventory not found",
          data: null,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error retrieving inventory",
        error: error.message,
      });
    }
  }

  async updateInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: number = Number(req.params.inventoryId);
      const data: Inventory = req.body;
      const isUpdated = await this.updateInventoryUseCase.execute(
        inventoryId,
        data
      );
      if (isUpdated) {
        res.status(200).json({
          success: true,
          message: "Inventory updated successfully",
          data: true,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Inventory not found",
          error: "Inventory not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating inventory",
        error: error.message,
      });
    }
  }

  async deleteInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: number = Number(req.params.inventoryId);
      const isDeleted = await this.deleteInventoryUseCase.execute(inventoryId);
      if (isDeleted) {
        res.status(200).json({
          success: true,
          message: "Inventory deleted successfully",
          data: true,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Inventory not found",
          error: "Inventory not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting inventory",
        error: error.message,
      });
    }
  }
}
