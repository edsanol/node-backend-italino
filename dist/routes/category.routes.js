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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const category_controller_1 = require("../controllers/category.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let CategoryRoutes = class CategoryRoutes {
    constructor(categoryController) {
        this.categoryController = categoryController;
    }
    configureRoutes(router) {
        router.post("/categories", validate_jwt_1.validateJWT, this.categoryController.createCategory.bind(this.categoryController));
        router.get("/categories", validate_jwt_1.validateJWT, this.categoryController.getAllCategories.bind(this.categoryController));
        router.get("/categories/:categoryId", validate_jwt_1.validateJWT, this.categoryController.getCategory.bind(this.categoryController));
        router.put("/categories/:categoryId", validate_jwt_1.validateJWT, this.categoryController.updateCategory.bind(this.categoryController));
        router.delete("/categories/:categoryId", validate_jwt_1.validateJWT, this.categoryController.deleteCategory.bind(this.categoryController));
    }
};
CategoryRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CategoryController)),
    __metadata("design:paramtypes", [category_controller_1.CategoryController])
], CategoryRoutes);
exports.CategoryRoutes = CategoryRoutes;
