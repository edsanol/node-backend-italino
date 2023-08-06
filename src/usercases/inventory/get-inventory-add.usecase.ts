import { InventoryServiceInterface } from "interfaces/inventory.service.interface";
import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";

@injectable()
export class GetInventoryByIdAndAddUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(idInventory: number) {
    const inventoryByIdAndAdd =
      await this.inventoryService.getInventoryByIdAndAddInventory(idInventory);
    return inventoryByIdAndAdd;
  }
}
