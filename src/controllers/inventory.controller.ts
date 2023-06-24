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
import { AddInventoryUseCase } from "../usercases/inventory/add-inventory.usecase";
import { IAddInventoryDto } from "../dto/addInventoryDto";
import { GetInventoryByIdAndAddUseCase } from "../usercases/inventory/get-inventory-add.usecase";
import { GetInventoryByNameOrReferenceUseCase } from "../usercases/inventory/get-inventory-by-name-or-reference.usecase";
import { UpdateInventoryFromAppUseCase } from "../usercases/inventory/update-inventory-app.usecase";

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
    private deleteInventoryUseCase: DeleteInventoryUseCase,
    @inject(TYPES.AddInventoryUseCase)
    private addInventoryUseCase: AddInventoryUseCase,
    @inject(TYPES.GetInventoryByIdAndAddUseCase)
    private getInventoryByIdAndAddUseCase: GetInventoryByIdAndAddUseCase,
    @inject(TYPES.GetInventoryByNameOrReferenceUseCase)
    private getInventoryByNameOrReferenceUseCase: GetInventoryByNameOrReferenceUseCase,
    @inject(TYPES.UpdateInventoryFromAppUseCase)
    private updateInventoryFromAppUseCase: UpdateInventoryFromAppUseCase
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
      const data: Inventory = req.body;
      const isUpdated = await this.updateInventoryUseCase.execute(data);
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

  async addInventory(req: Request, res: Response): Promise<void> {
    try {
      const request: IAddInventoryDto = req.body;
      const isAdded = await this.addInventoryUseCase.execute(request);
      if (isAdded) {
        res.status(200).json({
          success: true,
          message: "Inventory added successfully",
          data: isAdded,
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
        message: "Error adding inventory",
        error: error.message,
      });
    }
  }

  async getInventoryByIdAndAdd(req: Request, res: Response): Promise<void> {
    try {
      const inventoryId: number = Number(req.params.inventoryId);
      const inventory = await this.getInventoryByIdAndAddUseCase.execute(
        inventoryId
      );
      if (inventory) {
        res.status(200).json({
          success: true,
          message: "Inventory added successfully",
          data: inventory,
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
        message: "Error getting inventory",
        error: error.message,
      });
    }
  }

  async getInventoryByNameOrReference(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const request: string = req.params.nameOrReference;
      console.log("request", request);
      const inventory = await this.getInventoryByNameOrReferenceUseCase.execute(
        request
      );
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
          error: "Inventory not found",
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

  async updateInventoryFromApp(req: Request, res: Response): Promise<void> {
    try {
      const request: IInventoryDto = req.body;
      const isUpdated = await this.updateInventoryFromAppUseCase.execute(
        request
      );
      if (isUpdated) {
        res.status(200).json({
          success: true,
          message: "Inventory updated successfully",
          data: isUpdated,
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
}
