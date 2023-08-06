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
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let UserRoutes = class UserRoutes {
    constructor(userController) {
        this.userController = userController;
    }
    configureRoutes(router) {
        router.post("/users/login", this.userController.loginUser.bind(this.userController));
        router.get("/users/validate-token", validate_jwt_1.validateJWT, this.userController.revalidateToken.bind(this.userController));
        router.get("/users", validate_jwt_1.validateJWT, this.userController.getAllUsers.bind(this.userController));
        router.post("/users", validate_jwt_1.validateJWT, this.userController.createUser.bind(this.userController));
        router.get("/users/:userId", validate_jwt_1.validateJWT, this.userController.getUser.bind(this.userController));
        router.put("/users/:userId", validate_jwt_1.validateJWT, this.userController.updateUser.bind(this.userController));
        router.delete("/users/:userId", validate_jwt_1.validateJWT, this.userController.deleteUser.bind(this.userController));
        router.put("/users/:userId/password", validate_jwt_1.validateJWT, this.userController.updatePassword.bind(this.userController));
        router.post("/users-recover/forgot-password", this.userController.forgotPassword.bind(this.userController));
        router.put("/users-reset/reset-password", this.userController.resetPassword.bind(this.userController));
    }
};
UserRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserController)),
    __metadata("design:paramtypes", [user_controller_1.UserController])
], UserRoutes);
exports.UserRoutes = UserRoutes;
