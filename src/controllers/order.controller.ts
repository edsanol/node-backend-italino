import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateOrderUseCase } from "../usercases/order/create-order.usecase";
import { Request, Response } from "express";
import { IOrderDto } from "../dto/orderDto";
import { GetAllOrdersUseCase } from "../usercases/order/getAll-orders.usecase";
import { GetAllOrdersByUserIdUseCase } from "../usercases/order/getByUserId-order.usecase";
import { GetOrderByIdUseCase } from "../usercases/order/getById-order.usecase";
import { UpdateOrderUseCase } from "../usercases/order/update-order.usecase";
import { CreateReturnOrderUseCase } from "../usercases/order/create-return.usecase";
import { GetOrderAndReturnByIdUseCase } from "../usercases/order/get-order-and-return-by-id.usecase";
import { GetOrderByReferenceUseCase } from "../usercases/order/get-order-by-reference.usecase";
import { RequestToToken } from "../interfaces/token.interface";
import { GetOrderStatsUseCase } from "../usercases/order/get-order-stats.usecase";
import { GetOrderProductionUseCase } from "../usercases/order/get-order-production.usecase";

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
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    @inject(TYPES.CreateReturnOrderUseCase)
    private readonly createReturnOrderUseCase: CreateReturnOrderUseCase,
    @inject(TYPES.GetOrderAndReturnByIdUseCase)
    private readonly getOrderAndReturnByIdUseCase: GetOrderAndReturnByIdUseCase,
    @inject(TYPES.GetOrderByReferenceUseCase)
    private readonly getOrderByReferenceUseCase: GetOrderByReferenceUseCase,
    @inject(TYPES.GetOrderStatsUseCase)
    private readonly getOrderStatsUseCase: GetOrderStatsUseCase,
    @inject(TYPES.GetOrderProductionUseCase)
    private readonly getOrderProductionUseCase: GetOrderProductionUseCase
  ) {}

  async createOrder(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

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

  async getAllOrders(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

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

  async getAllOrdersByUserId(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const userIdFromParams = Number(req.params.id);
      const allOrders = await this.getAllOrdersByUserIdUseCase.execute(
        userIdFromParams
      );
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

  async getOrderById(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

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

  async updateOrder(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

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

  async createReturnOrder(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const order: IOrderDto = req.body;
      const newOrder = await this.createReturnOrderUseCase.execute(order);
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

  async getOrderAndReturnById(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const id = Number(req.params.id);
      const order = await this.getOrderAndReturnByIdUseCase.execute(id);
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

  async getOrderByReference(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;

      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });

        return;
      }

      const reference = req.params.reference;
      const order = await this.getOrderByReferenceUseCase.execute(reference);
      res.status(201).json({
        success: true,
        message: "Order by reference",
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting order by reference ${error.message}`,
      });
    }
  }

  async getOrderStats(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;
      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });
        return;
      }
      const orderStats = await this.getOrderStatsUseCase.execute();
      res.status(201).json({
        success: true,
        message: "Order stats",
        data: orderStats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting order stats ${error.message}`,
      });
    }
  }

  async getOrdersProduction(req: RequestToToken, res: Response) {
    try {
      const { userId, roleId } = req;
      if (!userId || !roleId) {
        res.status(401).json({
          success: false,
          message: "No token provided",
          error: `No token provided`,
        });
        return;
      }
      const ordersProduction = await this.getOrderProductionUseCase.execute();
      res.status(201).json({
        success: true,
        message: "Orders production",
        data: ordersProduction,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting orders production ${error.message}`,
      });
    }
  }
}
