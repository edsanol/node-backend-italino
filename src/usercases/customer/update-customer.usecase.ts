import { inject, injectable } from "inversify";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";
import { TYPES } from "../../config/types";
import { Customer } from "../../domain/models/customer.model";
import { ICustomerDto } from "../../dto/customerDto";

@injectable()
export class UpdateCustomerUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(idCustomer: number, customer: ICustomerDto): Promise<Customer> {
    const isUpdated = await this.customerService.updateCustomer(
      idCustomer,
      customer
    );
    return isUpdated;
  }
}
