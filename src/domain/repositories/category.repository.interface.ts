import { Category } from "../models/category.model";

export interface CategoryRepositoryInterface {
  createCategory(category: Category): Promise<Category>;
  getAllCategories(): Promise<Category[] | null>;
  getCategoryById(idCategory: number): Promise<Category | null>;
  updateCategory(idCategory: number, category: Category): Promise<boolean>;
  deleteCategory(idCategory: number): Promise<boolean>;
}
