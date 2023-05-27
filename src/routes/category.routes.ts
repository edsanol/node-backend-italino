import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CategoryController } from "../controllers/category.controller";
import { Router } from "express";

@injectable()
export class CategoryRoutes {
  constructor(
    @inject(TYPES.CategoryController)
    private categoryController: CategoryController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/categories",
      this.categoryController.createCategory.bind(this.categoryController)
    );
    router.get(
      "/categories",
      this.categoryController.getAllCategories.bind(this.categoryController)
    );
    router.get(
      "/categories/:categoryId",
      this.categoryController.getCategory.bind(this.categoryController)
    );
    router.put(
      "/categories/:categoryId",
      this.categoryController.updateCategory.bind(this.categoryController)
    );
    router.delete(
      "/categories/:categoryId",
      this.categoryController.deleteCategory.bind(this.categoryController)
    );
  }
}
