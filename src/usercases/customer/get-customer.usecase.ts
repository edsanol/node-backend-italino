import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";
import { Customer } from "../../domain/models/customer.model";

@injectable()
export class GetCustomerUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(idCustomer: number): Promise<Customer | null> {
    const customerById = await this.customerService.getCustomerById(idCustomer);
    return customerById;
  }
}
