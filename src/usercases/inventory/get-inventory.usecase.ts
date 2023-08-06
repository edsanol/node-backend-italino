import { TYPES } from "../../config/types";
import { InventoryServiceInterface } from "interfaces/inventory.service.interface";
import { inject, injectable } from "inversify";
import { Inventory } from "../../domain/models/inventory.model";

@injectable()
export class GetInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(idInventory: number): Promise<Inventory | null> {
    const inventoryById = await this.inventoryService.getInventoryById(
      idInventory
    );
    return inventoryById;
  }
}
