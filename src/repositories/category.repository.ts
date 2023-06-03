import { Category } from "../domain/models/category.model";
import { CategoryRepositoryInterface } from "../domain/repositories/category.repository.interface";
import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { ICategoryDto } from "../dto/categoryDto";

@injectable()
export class CategoryRepositoryImpl implements CategoryRepositoryInterface {
  private readonly db: Repository<Category>;

  constructor() {
    this.db = AppDataSource.getRepository(Category);
  }

  async createCategory(category: ICategoryDto): Promise<Category> {
    const newCategory = new Category();
    newCategory.reference_category = category.categoryReference;
    newCategory.name_category = category.categoryName;
    newCategory.status_category = category.categoryStatus;
    newCategory.description_category = category.categoryDescription;
    newCategory.created_at = new Date();
    newCategory.updated_at = new Date();

    return this.db.manager.save(newCategory);
  }
  async getAllCategories(): Promise<Category[] | null> {
    const allCategories = await this.db.find();

    if (!allCategories) {
      return null;
    }

    return allCategories;
  }
  async getCategoryById(idCategory: number): Promise<Category | null> {
    const categoryById = await this.db.findOneBy({ id_category: idCategory });

    if (!categoryById) {
      return null;
    }

    return categoryById;
  }
  async updateCategory(
    idCategory: number,
    category: Category
  ): Promise<boolean> {
    const categoryToUpdate = await this.db.findOneBy({
      id_category: idCategory,
    });

    if (!categoryToUpdate) {
      return false;
    }

    await this.db.manager.save({ ...categoryToUpdate, ...category });

    return Promise.resolve(true);
  }
  async deleteCategory(idCategory: number): Promise<boolean> {
    const categoryToDelete = await this.db.findOneBy({
      id_category: idCategory,
    });

    if (!categoryToDelete) {
      return false;
    }

    await this.db.manager.remove(categoryToDelete);

    return Promise.resolve(true);
  }
}
