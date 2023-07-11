import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { OrderController } from "../controllers/order.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class OrderRoutes {
  constructor(
    @inject(TYPES.OrderController)
    private orderController: OrderController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/order",
      validateJWT,
      this.orderController.createOrder.bind(this.orderController)
    );
    router.get(
      "/order",
      validateJWT,
      this.orderController.getAllOrders.bind(this.orderController)
    );
    router.get(
      "/order/byUser/:id",
      validateJWT,
      this.orderController.getAllOrdersByUserId.bind(this.orderController)
    );
    router.get(
      "/order/:id",
      validateJWT,
      this.orderController.getOrderById.bind(this.orderController)
    );
    router.put(
      "/order",
      validateJWT,
      this.orderController.updateOrder.bind(this.orderController)
    );
    router.post(
      "/order/return",
      validateJWT,
      this.orderController.createReturnOrder.bind(this.orderController)
    );
    router.get(
      "/order/return/:id",
      validateJWT,
      this.orderController.getOrderAndReturnById.bind(this.orderController)
    );
    router.get(
      "/order/reference/:reference",
      validateJWT,
      this.orderController.getOrderByReference.bind(this.orderController)
    );
    router.get(
      "/order-stats/stats",
      validateJWT,
      this.orderController.getOrderStats.bind(this.orderController)
    );
    router.get(
      "/order-production",
      validateJWT,
      this.orderController.getOrdersProduction.bind(this.orderController)
    );
  }
}
