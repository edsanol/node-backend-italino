import { TYPES } from "../../config/types";
import { Inventory } from "../../domain/models/inventory.model";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { inject, injectable } from "inversify";

@injectable()
export class GetInventoriesByCategoryIdUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(idCategory: number): Promise<Inventory[] | null> {
    const inventories = await this.inventoryService.getInventoriesByCategoryId(
      idCategory
    );
    return inventories;
  }
}
