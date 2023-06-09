import { ICustomerDto } from "../../dto/customerDto";
import { Customer } from "../models/customer.model";

export interface CustomerRepositoryInterface {
  createCustomer(customer: ICustomerDto): Promise<Customer>;
  getAllCustomers(): Promise<Customer[] | null>;
  getCustomerById(idCustomer: number): Promise<Customer | null>;
  getCustomerByUserId(idUser: number): Promise<Customer[] | null>;
  updateCustomer(idCustomer: number, customer: ICustomerDto): Promise<boolean>;
  deleteCustomer(idCustomer: number): Promise<boolean>;
}
