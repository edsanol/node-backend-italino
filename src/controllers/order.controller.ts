import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateOrderUseCase } from "../usercases/order/create-order.usecase";
import { Order } from "../domain/models/order.model";
import { Request, Response } from "express";
import { IOrderDto } from "../dto/orderDto";

@injectable()
export class OrderController {
  constructor(
    @inject(TYPES.CreateOrderUseCase)
    private readonly createOrderUseCase: CreateOrderUseCase
  ) {}

  async createOrder(req: Request, res: Response) {
    try {
      const order: IOrderDto = req.body;
      const newOrder = await this.createOrderUseCase.execute(order);
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating order",
        error: `Error creating order ${error.message}`,
      });
    }
  }
}
