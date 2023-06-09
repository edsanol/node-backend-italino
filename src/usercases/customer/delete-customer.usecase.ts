import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";

@injectable()
export class DeleteCustomerUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(idCustomer: number): Promise<boolean> {
    const isDeleted = await this.customerService.deleteCustomer(idCustomer);
    return isDeleted;
  }
}
