import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";
import { Customer } from "../../domain/models/customer.model";

@injectable()
export class GetAllCustomersUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(): Promise<Customer[] | null> {
    const allCustomers = await this.customerService.getAllCustomers();
    return allCustomers;
  }
}
