import { Customer } from "../domain/models/customer.model";
import { ICustomerDto } from "../dto/customerDto";

export interface CustomerServiceInterface {
  createCustomer(customer: ICustomerDto): Promise<Customer>;
  getAllCustomers(): Promise<Customer[] | null>;
  getCustomerById(idCustomer: number): Promise<Customer | null>;
  getCustomerByUserId(idUser: number): Promise<Customer[] | null>;
  updateCustomer(idCustomer: number, customer: ICustomerDto): Promise<Customer>;
  deleteCustomer(idCustomer: number): Promise<boolean>;
}
