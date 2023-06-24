import { TYPES } from "../config/types";
import { inject, injectable } from "inversify";
import { CategoryController } from "../controllers/category.controller";
import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";

@injectable()
export class CategoryRoutes {
  constructor(
    @inject(TYPES.CategoryController)
    private categoryController: CategoryController
  ) {}

  configureRoutes(router: Router): void {
    router.post(
      "/categories",
      validateJWT,
      this.categoryController.createCategory.bind(this.categoryController)
    );
    router.get(
      "/categories",
      validateJWT,
      this.categoryController.getAllCategories.bind(this.categoryController)
    );
    router.get(
      "/categories/:categoryId",
      validateJWT,
      this.categoryController.getCategory.bind(this.categoryController)
    );
    router.put(
      "/categories/:categoryId",
      validateJWT,
      this.categoryController.updateCategory.bind(this.categoryController)
    );
    router.delete(
      "/categories/:categoryId",
      validateJWT,
      this.categoryController.deleteCategory.bind(this.categoryController)
    );
  }
}
