import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";

@injectable()
export class DeleteInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(idInventory: number): Promise<boolean> {
    const isDeleted = await this.inventoryService.deleteInventory(idInventory);
    return isDeleted;
  }
}
