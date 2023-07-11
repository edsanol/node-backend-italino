import { ICustomerDto } from "../../dto/customerDto";
import { Customer } from "../models/customer.model";
import { ICustomerStatsDto } from "../../dto/customerStatsDto";

export interface CustomerRepositoryInterface {
  createCustomer(customer: ICustomerDto): Promise<Customer>;
  getAllCustomers(): Promise<Customer[] | null>;
  getCustomerById(idCustomer: number): Promise<Customer | null>;
  getCustomerByUserId(idUser: number): Promise<Customer[] | null>;
  updateCustomer(idCustomer: number, customer: ICustomerDto): Promise<Customer>;
  deleteCustomer(idCustomer: number): Promise<boolean>;
  getCustomerByNameOrNIT(nameOrNit: string): Promise<Customer[] | null>;
  getCustomerStats(): Promise<ICustomerStatsDto>;
}
