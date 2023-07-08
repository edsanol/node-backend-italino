import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";

@injectable()
export class GetCustomerByNameOrNitUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(nameOrNit: string) {
    const customerByNameOrNit =
      await this.customerService.getCustomerByNameOrNIT(nameOrNit);
    return customerByNameOrNit;
  }
}
