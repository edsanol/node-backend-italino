import { TYPES } from "../../config/types";
import { inject, injectable } from "inversify";
import { CategoryServiceInterface } from "../../interfaces/category.service.interface";

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject(TYPES.CategoryService)
    private categoryService: CategoryServiceInterface
  ) {}

  async execute(idCategory: number): Promise<boolean> {
    const isDeleted = await this.categoryService.deleteCategory(idCategory);
    return isDeleted;
  }
}
