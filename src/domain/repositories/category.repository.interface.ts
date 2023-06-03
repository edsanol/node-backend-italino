import { Category } from "../models/category.model";
import { ICategoryDto } from "../../dto/categoryDto";

export interface CategoryRepositoryInterface {
  createCategory(category: ICategoryDto): Promise<Category>;
  getAllCategories(): Promise<Category[] | null>;
  getCategoryById(idCategory: number): Promise<Category | null>;
  updateCategory(idCategory: number, category: Category): Promise<boolean>;
  deleteCategory(idCategory: number): Promise<boolean>;
}
