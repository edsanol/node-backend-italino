import { Category } from "domain/models/category.model";
import { CategoryServiceInterface } from "../interfaces/category.service.interface";
import { inject, injectable } from "inversify";
import { CategoryRepositoryInterface } from "../domain/repositories/category.repository.interface";
import { TYPES } from "../config/types";
import { ICategoryDto } from "../dto/categoryDto";

@injectable()
export class CategoryServiceImpl implements CategoryServiceInterface {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: CategoryRepositoryInterface
  ) {}

  async createCategory(category: ICategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.createCategory(category);
    return newCategory;
  }
  async getAllCategories(): Promise<Category[] | null> {
    const allCategories = await this.categoryRepository.getAllCategories();
    return allCategories;
  }
  async getCategoryById(idCategory: number): Promise<Category | null> {
    const categoryById = await this.categoryRepository.getCategoryById(
      idCategory
    );
    return categoryById;
  }
  async updateCategory(
    idCategory: number,
    category: ICategoryDto
  ): Promise<Category> {
    const isUpdated = await this.categoryRepository.updateCategory(
      idCategory,
      category
    );
    return isUpdated;
  }
  async deleteCategory(idCategory: number): Promise<boolean> {
    const isDeleted = await this.categoryRepository.deleteCategory(idCategory);
    return isDeleted;
  }
}
