import { TYPES } from "../../config/types";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { inject, injectable } from "inversify";
import { Category } from "../../domain/models/category.model";

@injectable()
export class GetCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(idCategory: number): Promise<Category | null> {
    const categoryById = await this.categoryService.getCategoryById(idCategory);
    return categoryById;
  }
}
