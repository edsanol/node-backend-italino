import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CreateCategoryUseCase } from "../usercases/category/create-category.usecase";
import { GetAllCategoriesUseCase } from "../usercases/category/getall-categories.usecase";
import { GetCategoryUseCase } from "../usercases/category/get-category.usecase";
import { UpdateCategoryUseCase } from "../usercases/category/update-category.usecase";
import { DeleteCategoryUseCase } from "../usercases/category/delete-category.usecase";
import { Category } from "../domain/models/category.model";
import { Request, Response } from "express";

@injectable()
export class CategoryController {
  constructor(
    @inject(TYPES.CreateCategoryUseCase)
    private createCategoryUseCase: CreateCategoryUseCase,
    @inject(TYPES.GetAllCategoriesUseCase)
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,
    @inject(TYPES.GetCategoryUseCase)
    private getCategoryUseCase: GetCategoryUseCase,
    @inject(TYPES.UpdateCategoryUseCase)
    private updateCategoryUseCase: UpdateCategoryUseCase,
    @inject(TYPES.DeleteCategoryUseCase)
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {}

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const category: Category = req.body;
      const newCategory = await this.createCategoryUseCase.execute(category);
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating category",
        error: error.message,
      });
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.getAllCategoriesUseCase.execute();
      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error retrieving categories",
        error: error.message,
      });
    }
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: number = Number(req.params.categoryId);
      const category = await this.getCategoryUseCase.execute(categoryId);
      if (category) {
        res.status(200).json({
          success: true,
          message: "Category retrieved successfully",
          data: category,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Category not found",
          error: "Category not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error retrieving category",
        error: error.message,
      });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: number = Number(req.params.categoryId);
      const data: Category = req.body;
      const isUpdated = await this.updateCategoryUseCase.execute(
        categoryId,
        data
      );
      if (isUpdated) {
        res.status(200).json({
          success: true,
          message: "Category updated successfully",
          data: true,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Category not found",
          error: "Category not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating category",
        error: error.message,
      });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId: number = Number(req.params.categoryId);
      const isDeleted = await this.deleteCategoryUseCase.execute(categoryId);
      if (isDeleted) {
        res.status(200).json({
          success: true,
          message: "Category deleted successfully",
          data: true,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Category not found",
          error: "Category not found",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting category",
        error: error.message,
      });
    }
  }
}
