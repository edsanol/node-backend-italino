import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InventoryController } from "../controllers/inventory.controller";
import { Router } from "express";

@injectable()
export class InventoryRoutes {
  constructor(
    @inject(TYPES.InventoryController)
    private inventoryController: InventoryController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/inventories",
      this.inventoryController.createInventory.bind(this.inventoryController)
    );
    router.get(
      "/inventories",
      this.inventoryController.getAllInventories.bind(this.inventoryController)
    );
    router.get(
      "/inventories/:inventoryId",
      this.inventoryController.getInventory.bind(this.inventoryController)
    );
    router.put(
      "/inventories/:inventoryId",
      this.inventoryController.updateInventory.bind(this.inventoryController)
    );
    router.delete(
      "/inventories/:inventoryId",
      this.inventoryController.deleteInventory.bind(this.inventoryController)
    );
  }
}
