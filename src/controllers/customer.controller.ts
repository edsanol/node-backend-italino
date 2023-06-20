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
    private getCustomerByUserIdUseCase: GetCustomerByUserIdUseCase
  ) {}

  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
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

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
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

  async getCustomer(req: Request, res: Response): Promise<void> {
    try {
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

  async updateCustomer(req: Request, res: Response): Promise<void> {
    try {
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

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
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

  async getCustomerByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      const customers = await this.getCustomerByUserIdUseCase.execute(userId);
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
}