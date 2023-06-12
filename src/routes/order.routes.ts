import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { OrderController } from "../controllers/order.controller";
import { Router } from "express";

@injectable()
export class OrderRoutes {
  constructor(
    @inject(TYPES.OrderController)
    private orderController: OrderController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/order",
      this.orderController.createOrder.bind(this.orderController)
    );
  }
}
