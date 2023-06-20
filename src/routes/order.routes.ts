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
    router.get(
      "/order",
      this.orderController.getAllOrders.bind(this.orderController)
    );
    router.get(
      "/order/byUser/:id",
      this.orderController.getAllOrdersByUserId.bind(this.orderController)
    );
    router.get(
      "/order/:id",
      this.orderController.getOrderById.bind(this.orderController)
    );
    router.put(
      "/order",
      this.orderController.updateOrder.bind(this.orderController)
    );
    router.post(
      "/order/return",
      this.orderController.createReturnOrder.bind(this.orderController)
    );
  }
}
