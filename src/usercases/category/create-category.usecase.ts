import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";
import { Category } from "../../domain/models/category.model";
import { ICategoryDto } from "../../dto/categoryDto";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(category: ICategoryDto): Promise<Category> {
    const newCategory = await this.categoryService.createCategory(category);
    return newCategory;
  }
}
