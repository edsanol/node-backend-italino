import { Category } from "../models/category.model";
import { ICategoryDto } from "../../dto/categoryDto";

export interface CategoryRepositoryInterface {
  createCategory(category: ICategoryDto): Promise<Category>;
  getAllCategories(): Promise<Category[] | null>;
  getCategoryById(idCategory: number): Promise<Category | null>;
  updateCategory(idCategory: number, category: ICategoryDto): Promise<Category>;
  deleteCategory(idCategory: number): Promise<boolean>;
}
