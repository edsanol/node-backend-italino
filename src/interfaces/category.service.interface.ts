import { Category } from "../domain/models/category.model";
import { ICategoryDto } from "../dto/categoryDto";

export interface CategoryServiceInterface {
  createCategory(category: ICategoryDto): Promise<Category>;
  getAllCategories(): Promise<Category[] | null>;
  getCategoryById(idCategory: number): Promise<Category | null>;
  updateCategory(idCategory: number, category: Category): Promise<boolean>;
  deleteCategory(idCategory: number): Promise<boolean>;
}
