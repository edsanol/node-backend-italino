import { inject, injectable } from "inversify";
import { CreateCustomerUseCase } from "../usercases/customer/create-customer.usecase";
import { GetAllCustomersUseCase } from "../usercases/customer/getall-customers.usecase";
import { TYPES } from "../config/types";
import { GetCustomerUseCase } from "../usercases/customer/get-customer.usecase";
import { UpdateCustomerUseCase } from "../usercases/customer/update-customer.usecase";
import { DeleteCustomerUseCase } from "../usercases/customer/delete-customer.usecase";
import { GetCustomerByUserIdUseCase } from "../usercases/customer/get-customer-by-userid.usecase";
import { ICustomerDto } from "../dto/customerDto";
import { Request, Response } from "express";
import { RequestToToken } from "../interfaces/token.interface";
import { GetCustomerByNameOrNitUseCase } from "../usercases/customer/get-customer-by-name-or-nit.usecase";
import { GetCustomerStatsUseCase } from "../usercases/customer/get-customer-stats.usecase";

@injectable()
export class CustomerController {
  constructor(
    @inject(TYPES.CreateCustomerUseCase)
    private createCustomerUseCase: CreateCustomerUseCase,
    @inject(TYPES.GetAllCustomersUseCase)
    private getAllCustomersUseCase: GetAllCustomersUseCase,
    @inject(TYPES.GetCustomerUseCase)
    private getCustomerUseCase: GetCustomerUseCase,
    @inject(TYPES.UpdateCustomerUseCase)
    private updateCustomerUseCase: UpdateCustomerUseCase,
    @inject(TYPES.DeleteCustomerUseCase)
    private deleteCustomerUseCase: DeleteCustomerUseCase,
    @inject(TYPES.GetCustomerByUserIdUseCase)
    private getCustomerByUserIdUseCase: GetCustomerByUserIdUseCase,
    @inject(TYPES.GetCustomerByNameOrNitUseCase)
    private getCustomerByNameOrNitUseCase: GetCustomerByNameOrNitUseCase,
    @inject(TYPES.GetCustomerStatsUseCase)
    private getCustomerStatsUseCase: GetCustomerStatsUseCase
  ) {}

  async createCustomer(req: RequestToToken, res: Response): Promise<void> {
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

      const customer: ICustomerDto = req.body;
      const newCustomer = await this.createCustomerUseCase.execute(customer);
      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: newCustomer,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error creating customer ${error.message}`,
      });
    }
  }

  async getAllCustomers(req: RequestToToken, res: Response): Promise<void> {
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

      const allCustomers = await this.getAllCustomersUseCase.execute();
      res.status(200).json({
        success: true,
        message: "All customers",
        data: allCustomers,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting customers ${error.message}`,
      });
    }
  }

  async getCustomer(req: RequestToToken, res: Response): Promise<void> {
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

      const customerId: number = Number(req.params.customerId);
      const customer = await this.getCustomerUseCase.execute(customerId);
      if (customer) {
        res.status(200).json({
          success: true,
          message: "Customer",
          data: customer,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer not found",
          error: "Customer not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting customer ${error.message}`,
      });
    }
  }

  async updateCustomer(req: RequestToToken, res: Response): Promise<void> {
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

      const customerId: number = Number(req.params.customerId);
      const data: ICustomerDto = req.body;
      const isUpdated = await this.updateCustomerUseCase.execute(
        customerId,
        data
      );
      if (isUpdated) {
        res.status(200).json({
          success: true,
          message: "Customer updated successfully",
          data: isUpdated,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer not found",
          error: "Customer not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error updating customer ${error.message}`,
      });
    }
  }

  async deleteCustomer(req: RequestToToken, res: Response): Promise<void> {
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

      const customerId: number = Number(req.params.customerId);
      const isDeleted = await this.deleteCustomerUseCase.execute(customerId);
      if (isDeleted) {
        res.status(200).json({
          success: true,
          message: "Customer deleted successfully",
          data: isDeleted,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer not found",
          error: "Customer not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error deleting customer ${error.message}`,
      });
    }
  }

  async getCustomerByUserId(req: RequestToToken, res: Response): Promise<void> {
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

      const userIdFromParams: number = Number(req.params.userId);
      const customers = await this.getCustomerByUserIdUseCase.execute(
        userIdFromParams
      );
      if (customers) {
        res.status(200).json({
          success: true,
          message: "Customer",
          data: customers,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer not found",
          error: "Customer not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting customer ${error.message}`,
      });
    }
  }

  async getCustomerByNameOrNit(
    req: RequestToToken,
    res: Response
  ): Promise<void> {
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
      const { nameOrNit } = req.params;
      const customers = await this.getCustomerByNameOrNitUseCase.execute(
        nameOrNit as string
      );
      if (customers) {
        res.status(200).json({
          success: true,
          message: "Customer",
          data: customers,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer not found",
          error: "Customer not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting customer ${error.message}`,
      });
    }
  }

  async getCustomerStats(req: RequestToToken, res: Response): Promise<void> {
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

      const stats = await this.getCustomerStatsUseCase.execute();
      if (stats) {
        res.status(200).json({
          success: true,
          message: "Customer stats",
          data: stats,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Customer stats not found",
          error: "Customer stats not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: `Error getting customer ${error.message}`,
      });
    }
  }
}
