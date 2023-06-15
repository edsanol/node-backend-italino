import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateOrderUseCase } from "../usercases/order/create-order.usecase";
import { Request, Response } from "express";
import { IOrderDto } from "../dto/orderDto";
import { GetAllOrdersUseCase } from "../usercases/order/getAll-orders.usecase";
import { GetAllOrdersByUserIdUseCase } from "../usercases/order/getByUserId-order.usecase";
import { GetOrderByIdUseCase } from "../usercases/order/getById-order.usecase";
import { UpdateOrderUseCase } from "../usercases/order/update-order.usecase";

@injectable()
export class OrderController {
  constructor(
    @inject(TYPES.CreateOrderUseCase)
    private readonly createOrderUseCase: CreateOrderUseCase,
    @inject(TYPES.GetAllOrdersUseCase)
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    @inject(TYPES.GetAllOrdersByUserIdUseCase)
    private readonly getAllOrdersByUserIdUseCase: GetAllOrdersByUserIdUseCase,
    @inject(TYPES.GetOrderByIdUseCase)
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    @inject(TYPES.UpdateOrderUseCase)
    private readonly updateOrderUseCase: UpdateOrderUseCase
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

  async getAllOrders(req: Request, res: Response) {
    try {
      const allOrders = await this.getAllOrdersUseCase.execute();
      res.status(201).json({
        success: true,
        message: "All orders",
        data: allOrders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting all orders ${error.message}`,
      });
    }
  }

  async getAllOrdersByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const allOrders = await this.getAllOrdersByUserIdUseCase.execute(userId);
      res.status(201).json({
        success: true,
        message: "All orders by user",
        data: allOrders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting all orders by user ${error.message}`,
      });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const order = await this.getOrderByIdUseCase.execute(id);
      res.status(201).json({
        success: true,
        message: "Order by id",
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting order by id ${error.message}`,
      });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const order: IOrderDto = req.body;
      const updatedOrder = await this.updateOrderUseCase.execute(order);
      res.status(201).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error updating order ${error.message}`,
      });
    }
  }
}
