import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";

@injectable()
export class GetInventoryByNameOrReferenceUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(nameOrReference: string) {
    const inventoryByNameOrReference =
      await this.inventoryService.getInventoryByNameOrReference(
        nameOrReference
      );
    return inventoryByNameOrReference;
  }
}
