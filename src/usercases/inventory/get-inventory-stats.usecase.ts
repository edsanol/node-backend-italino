import { inject, injectable } from "inversify";
import { InventoryServiceInterface } from "../../interfaces/inventory.service.interface";
import { TYPES } from "../../config/types";
import { IInventoryStatsDto } from "../../dto/inventoryStatsDto";

@injectable()
export class GetInventoryStatsUseCase {
  constructor(
    @inject(TYPES.InventoryService)
    private inventoryService: InventoryServiceInterface
  ) {}

  async execute(): Promise<IInventoryStatsDto> {
    const inventoryStats = await this.inventoryService.getInventoryStats();
    return inventoryStats;
  }
}
