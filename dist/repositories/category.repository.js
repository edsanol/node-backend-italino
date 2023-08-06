"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepositoryImpl = void 0;
const category_model_1 = require("../domain/models/category.model");
const inversify_1 = require("inversify");
const db_1 = require("../db");
let CategoryRepositoryImpl = class CategoryRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(category_model_1.Category);
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new category_model_1.Category();
            newCategory.reference_category = category.referenceCategory;
            newCategory.name_category = category.nameCategory;
            newCategory.status_category = category.statusCategory;
            newCategory.description_category = category.descriptionCategory;
            newCategory.created_at = new Date();
            newCategory.updated_at = new Date();
            return this.db.manager.save(newCategory);
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCategories = yield this.db.find();
            if (!allCategories) {
                return null;
            }
            return allCategories;
        });
    }
    getCategoryById(idCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryById = yield this.db.findOneBy({ id_category: idCategory });
            if (!categoryById) {
                return null;
            }
            return categoryById;
        });
    }
    updateCategory(idCategory, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryToUpdate = yield this.db.findOneBy({
                id_category: idCategory,
            });
            if (!categoryToUpdate) {
                throw new Error("Category not found");
            }
            categoryToUpdate.id_category = category.id;
            categoryToUpdate.reference_category = category.referenceCategory;
            categoryToUpdate.name_category = category.nameCategory;
            categoryToUpdate.status_category = category.statusCategory;
            categoryToUpdate.description_category = category.descriptionCategory;
            categoryToUpdate.updated_at = new Date();
            return this.db.manager.save(categoryToUpdate);
        });
    }
    deleteCategory(idCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryToDelete = yield this.db.findOneBy({
                id_category: idCategory,
            });
            if (!categoryToDelete) {
                return false;
            }
            yield this.db.manager.remove(categoryToDelete);
            return Promise.resolve(true);
        });
    }
};
CategoryRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CategoryRepositoryImpl);
exports.CategoryRepositoryImpl = CategoryRepositoryImpl;
