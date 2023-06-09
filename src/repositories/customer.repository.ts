import { Customer } from "../domain/models/customer.model";
import { ICustomerDto } from "../dto/customerDto";
import { CustomerRepositoryInterface } from "../domain/repositories/customer.repository.interface";
import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../domain/models/user.model";

@injectable()
export class CustomerRepositoryImpl implements CustomerRepositoryInterface {
  private readonly db: Repository<Customer>;
  private readonly dbUser: Repository<User>;

  constructor() {
    this.db = AppDataSource.getRepository(Customer);
    this.dbUser = AppDataSource.getRepository(User);
  }
  async createCustomer(customer: ICustomerDto): Promise<Customer> {
    const user = await this.dbUser.findOneByOrFail({
      id_user: customer.userId,
    });

    const newCustomer = new Customer();
    newCustomer.name_customer = customer.nameCustomer;
    newCustomer.nit_customer = customer.nitCustomer;
    newCustomer.address_customer = customer.addressCustomer;
    newCustomer.phone_customer = customer.phoneCustomer;
    newCustomer.status_customer = customer.statusCustomer;
    newCustomer.created_at = new Date();
    newCustomer.updated_at = new Date();
    newCustomer.user = user;

    return this.db.manager.save(newCustomer);
  }
  async getAllCustomers(): Promise<Customer[] | null> {
    const allCustomers = await this.db.find();

    if (!allCustomers) {
      return null;
    }

    return allCustomers;
  }
  async getCustomerById(idCustomer: number): Promise<Customer | null> {
    const customerById = await this.db.findOneBy({ id_customer: idCustomer });

    if (!customerById) {
      return null;
    }

    return customerById;
  }
  async getCustomerByUserId(idUser: number): Promise<Customer[] | null> {
    const customerByUserId = await this.db
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.user", "user")
      .where("user.id_user = :id_user", { id_user: idUser })
      .getMany();

    if (customerByUserId.length === 0) {
      return null;
    }

    return customerByUserId;
  }
  async updateCustomer(
    idCustomer: number,
    customer: ICustomerDto
  ): Promise<boolean> {
    const customerToUpdate = this.db.findOneBy({ id_customer: idCustomer });

    if (!customerToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...customerToUpdate, ...customer });

    return Promise.resolve(true);
  }
  async deleteCustomer(idCustomer: number): Promise<boolean> {
    const customerToDelete = await this.db.findOneBy({
      id_customer: idCustomer,
    });

    if (!customerToDelete) {
      return false;
    }

    await this.db.manager.remove(customerToDelete);

    return Promise.resolve(true);
  }
}
