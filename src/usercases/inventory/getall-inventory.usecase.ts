import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { Inventory } from "../../domain/models/inventory.model";

@injectable()
export class GetAllInventoriesUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(): Promise<Inventory[] | null> {
    const allInventories = await this.inventoryService.getAllInventories();
    return allInventories;
  }
}
