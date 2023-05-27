import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { Category } from "../../domain/models/category.model";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(category: Category): Promise<Category> {
    const newCategory = await this.categoryService.createCategory(category);
    return newCategory;
  }
}
