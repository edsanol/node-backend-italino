import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";
import { ICustomerDto } from "../../dto/customerDto";
import { Customer } from "../../domain/models/customer.model";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(customer: ICustomerDto): Promise<Customer> {
    const newCustomer = await this.customerService.createCustomer(customer);
    return newCustomer;
  }
}
