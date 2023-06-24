import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { Inventory } from "../../domain/models/inventory.model";
import { IInventoryDto } from "../../dto/inventoryDto";

@injectable()
export class UpdateInventoryFromAppUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(inventory: IInventoryDto): Promise<Inventory> {
    const isUpdated = await this.inventoryService.updateInventoryFromApp(
      inventory
    );
    return isUpdated;
  }
}
