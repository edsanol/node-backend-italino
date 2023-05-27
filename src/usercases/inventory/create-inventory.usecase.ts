import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { Inventory } from "../../domain/models/inventory.model";

@injectable()
export class CreateInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(inventory: Inventory): Promise<Inventory> {
    const newInventory = await this.inventoryService.createInventory(inventory);
    return newInventory;
  }
}
