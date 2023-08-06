import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { IAddInventoryDto } from "../../dto/addInventoryDto";
import { Inventory } from "../../domain/models/inventory.model";

@injectable()
export class AddInventoryUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(addInventory: IAddInventoryDto): Promise<Inventory> {
    const newInventory = await this.inventoryService.addInventory(addInventory);
    return newInventory;
  }
}
