import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { Category } from "../../domain/models/category.model";
import { ICategoryDto } from "../../dto/categoryDto";

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(idCategory: number, category: ICategoryDto): Promise<Category> {
    const isUpdated = await this.categoryService.updateCategory(
      idCategory,
      category
    );
    return isUpdated;
  }
}
