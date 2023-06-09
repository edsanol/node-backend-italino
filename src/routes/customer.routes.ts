import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { CustomerController } from "../controllers/customer.controller";
import { Router } from "express";

@injectable()
export class CustomerRoutes {
  constructor(
    @inject(TYPES.CustomerController)
    private customerController: CustomerController
  ) {}

  configureRoutes(router: Router): void {
    router.get(
      "/customers",
      this.customerController.getAllCustomers.bind(this.customerController)
    );
    router.post(
      "/customers",
      this.customerController.createCustomer.bind(this.customerController)
    );
    router.get(
      "/customers/:customerId",
      this.customerController.getCustomer.bind(this.customerController)
    );
    router.patch(
      "/customers/:customerId",
      this.customerController.updateCustomer.bind(this.customerController)
    );
    router.delete(
      "/customers/:customerId",
      this.customerController.deleteCustomer.bind(this.customerController)
    );
    router.get(
      "/customers/:userId",
      this.customerController.getCustomerByUserId.bind(this.customerController)
    );
  }
}
