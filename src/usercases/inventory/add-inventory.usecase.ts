import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";

@injectable()
export class AddInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(addInventory: any): Promise<any> {
    const newInventory = await this.inventoryService.addInventory(addInventory);
    return newInventory;
  }
}
