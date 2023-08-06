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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CategoryController = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const create_category_usecase_1 = require("../usercases/category/create-category.usecase");
const getall_categories_usecase_1 = require("../usercases/category/getall-categories.usecase");
const get_category_usecase_1 = require("../usercases/category/get-category.usecase");
const update_category_usecase_1 = require("../usercases/category/update-category.usecase");
const delete_category_usecase_1 = require("../usercases/category/delete-category.usecase");
let CategoryController = class CategoryController {
    constructor(createCategoryUseCase, getAllCategoriesUseCase, getCategoryUseCase, updateCategoryUseCase, deleteCategoryUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
        this.getAllCategoriesUseCase = getAllCategoriesUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.updateCategoryUseCase = updateCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const category = req.body;
                const newCategory = yield this.createCategoryUseCase.execute(category);
                res.status(201).json({
                    success: true,
                    message: "Category created successfully",
                    data: newCategory,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating category",
                    error: `Error creating category ${error.message}`,
                });
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const categories = yield this.getAllCategoriesUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: "Categories retrieved successfully",
                    data: categories,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving categories",
                    error: `Error retrieving categories ${error.message}`,
                });
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const categoryId = Number(req.params.categoryId);
                const category = yield this.getCategoryUseCase.execute(categoryId);
                if (category) {
                    res.status(200).json({
                        success: true,
                        message: "Category retrieved successfully",
                        data: category,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Category not found",
                        error: "Category not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving category",
                    error: `Error retrieving categories ${error.message}`,
                });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const categoryId = Number(req.params.categoryId);
                const data = req.body;
                const isUpdated = yield this.updateCategoryUseCase.execute(categoryId, data);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "Category updated successfully",
                        data: isUpdated,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Category not found",
                        error: "Category not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error updating category",
                    error: error.message,
                });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req;
                if (!userId || !roleId) {
                    res.status(401).json({
                        success: false,
                        message: "No token provided",
                        error: `No token provided`,
                    });
                    return;
                }
                const categoryId = Number(req.params.categoryId);
                const isDeleted = yield this.deleteCategoryUseCase.execute(categoryId);
                if (isDeleted) {
                    res.status(200).json({
                        success: true,
                        message: "Category deleted successfully",
                        data: true,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Category not found",
                        error: "Category not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error deleting category",
                    error: `Error deleting category ${error.message}`,
                });
            }
        });
    }
};
CategoryController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateCategoryUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllCategoriesUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetCategoryUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UpdateCategoryUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DeleteCategoryUseCase)),
    __metadata("design:paramtypes", [create_category_usecase_1.CreateCategoryUseCase,
        getall_categories_usecase_1.GetAllCategoriesUseCase,
        get_category_usecase_1.GetCategoryUseCase,
        update_category_usecase_1.UpdateCategoryUseCase,
        delete_category_usecase_1.DeleteCategoryUseCase])
], CategoryController);
exports.CategoryController = CategoryController;
