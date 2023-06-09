import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { Customer } from "../../domain/models/customer.model";
import { CustomerServiceInterface } from "../../interfaces/customer.service.interface";

@injectable()
export class GetCustomerByUserIdUseCase {
  constructor(
    @inject(TYPES.CustomerService)
    private customerService: CustomerServiceInterface
  ) {}

  async execute(idUser: number): Promise<Customer[] | null> {
    const customerByUserId = await this.customerService.getCustomerByUserId(
      idUser
    );
    return customerByUserId;
  }
}
