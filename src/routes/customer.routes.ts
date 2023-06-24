import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { CustomerController } from "../controllers/customer.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class CustomerRoutes {
  constructor(
    @inject(TYPES.CustomerController)
    private customerController: CustomerController
  ) {}

  configureRoutes(router: Router): void {
    router.get(
      "/customers",
      validateJWT,
      this.customerController.getAllCustomers.bind(this.customerController)
    );
    router.post(
      "/customers",
      validateJWT,
      this.customerController.createCustomer.bind(this.customerController)
    );
    router.get(
      "/customers/:customerId",
      validateJWT,
      this.customerController.getCustomer.bind(this.customerController)
    );
    router.put(
      "/customers/:customerId",
      validateJWT,
      this.customerController.updateCustomer.bind(this.customerController)
    );
    router.delete(
      "/customers/:customerId",
      validateJWT,
      this.customerController.deleteCustomer.bind(this.customerController)
    );
    router.get(
      "/customersBySaller/:userId",
      validateJWT,
      this.customerController.getCustomerByUserId.bind(this.customerController)
    );
  }
}
