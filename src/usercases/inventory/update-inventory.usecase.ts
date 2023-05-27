import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { Inventory } from "../../domain/models/inventory.model";

@injectable()
export class UpdateInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(idInventory: number, inventory: Inventory): Promise<boolean> {
    const isUpdated = await this.inventoryService.updateInventory(
      idInventory,
      inventory
    );
    return isUpdated;
  }
}
