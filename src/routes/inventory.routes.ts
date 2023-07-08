import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { InventoryController } from "../controllers/inventory.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class InventoryRoutes {
  constructor(
    @inject(TYPES.InventoryController)
    private inventoryController: InventoryController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/inventories",
      validateJWT,
      this.inventoryController.createInventory.bind(this.inventoryController)
    );
    router.get(
      "/inventories",
      this.inventoryController.getAllInventories.bind(this.inventoryController)
    );
    router.get(
      "/inventories/:inventoryId",
      validateJWT,
      this.inventoryController.getInventory.bind(this.inventoryController)
    );
    router.put(
      "/inventories",
      validateJWT,
      this.inventoryController.updateInventory.bind(this.inventoryController)
    );
    router.delete(
      "/inventories/:inventoryId",
      validateJWT,
      this.inventoryController.deleteInventory.bind(this.inventoryController)
    );
    router.post(
      "/inventories/add",
      validateJWT,
      this.inventoryController.addInventory.bind(this.inventoryController)
    );
    router.get(
      "/inventories/add/:inventoryId",
      validateJWT,
      this.inventoryController.getInventoryByIdAndAdd.bind(
        this.inventoryController
      )
    );
    router.get(
      "/inventories/search/:nameOrReference",
      validateJWT,
      this.inventoryController.getInventoryByNameOrReference.bind(
        this.inventoryController
      )
    );
    router.put(
      "/inventories/app",
      validateJWT,
      this.inventoryController.updateInventoryFromApp.bind(
        this.inventoryController
      )
    );
    router.get(
      "/inventories/category/:categoryId",
      validateJWT,
      this.inventoryController.getInventoriesByCategoryId.bind(
        this.inventoryController
      )
    );
  }
}
