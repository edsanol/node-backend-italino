import { inject, injectable } from "inversify";
import { CustomerServiceInterface } from "../interfaces/customer.service.interface";
import { CustomerRepositoryInterface } from "../domain/repositories/customer.repository.interface";
import { TYPES } from "../config/types";
import { Customer } from "../domain/models/customer.model";
import { ICustomerDto } from "../dto/customerDto";

@injectable()
export class CustomerServiceImpl implements CustomerServiceInterface {
  constructor(
    @inject(TYPES.CustomerRepository)
    private customerRepository: CustomerRepositoryInterface
  ) {}

  async createCustomer(customer: ICustomerDto): Promise<Customer> {
    const newCustomer = await this.customerRepository.createCustomer(customer);
    return newCustomer;
  }
  async getAllCustomers(): Promise<Customer[] | null> {
    const allCustomers = await this.customerRepository.getAllCustomers();
    return allCustomers;
  }
  async getCustomerById(idCustomer: number): Promise<Customer | null> {
    const customerById = await this.customerRepository.getCustomerById(
      idCustomer
    );
    return customerById;
  }
  async getCustomerByUserId(idUser: number): Promise<Customer[] | null> {
    const customerByUserId = await this.customerRepository.getCustomerByUserId(
      idUser
    );
    return customerByUserId;
  }
  async updateCustomer(
    idCustomer: number,
    customer: ICustomerDto
  ): Promise<Customer> {
    const isUpdated = await this.customerRepository.updateCustomer(
      idCustomer,
      customer
    );
    return isUpdated;
  }
  async deleteCustomer(idCustomer: number): Promise<boolean> {
    const isDeleted = await this.customerRepository.deleteCustomer(idCustomer);
    return isDeleted;
  }
}
