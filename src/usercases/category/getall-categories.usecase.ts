import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { Category } from "../../domain/models/category.model";

@injectable()
export class GetAllCategoriesUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(): Promise<Category[] | null> {
    const allCategories = await this.categoryService.getAllCategories();
    return allCategories;
  }
}
