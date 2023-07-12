import { Customer } from "../domain/models/customer.model";
import { ICustomerDto } from "../dto/customerDto";
import { ICustomerStatsDto } from "../dto/customerStatsDto";

export interface CustomerServiceInterface {
  createCustomer(customer: ICustomerDto): Promise<Customer>;
  getAllCustomers(): Promise<Customer[] | null>;
  getCustomerById(idCustomer: number): Promise<Customer | null>;
  getCustomerByUserId(idUser: number): Promise<Customer[] | null>;
  updateCustomer(idCustomer: number, customer: ICustomerDto): Promise<Customer>;
  deleteCustomer(idCustomer: number): Promise<boolean>;
  getCustomerByNameOrNIT(nameOrNit: string): Promise<Customer[] | null>;
  getCustomerStats(): Promise<ICustomerStatsDto>;
}
