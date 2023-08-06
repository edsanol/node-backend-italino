import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";
import { ICustomerStatsDto } from "../../dto/customerStatsDto";

@injectable()
export class GetCustomerStatsUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(): Promise<ICustomerStatsDto> {
    const customerStats = await this.customerService.getCustomerStats();
    return customerStats;
  }
}
