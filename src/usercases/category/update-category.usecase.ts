import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { Category } from "../../domain/models/category.model";

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(idCategory: number, category: Category): Promise<boolean> {
    const isUpdated = await this.categoryService.updateCategory(
      idCategory,
      category
    );
    return isUpdated;
  }
}
