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
exports.UserController = void 0;
const create_user_usecase_1 = require("../usercases/user/create-user.usecase");
const get_user_usecase_1 = require("../usercases/user/get-user.usecase");
const update_user_usecase_1 = require("../usercases/user/update-user.usecase");
const delete_user_usecase_1 = require("../usercases/user/delete-user.usecase");
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const getAll_user_usecase_1 = require("../usercases/user/getAll-user.usecase");
const login_user_usecase_1 = require("../usercases/user/login-user.usecase");
const jwt_1 = require("../utils/jwt");
const update_password_usecase_1 = require("../usercases/user/update-password.usecase");
const mailer_1 = require("../utils/mailer");
const forgot_password_usecase_1 = require("../usercases/user/forgot-password.usecase");
const reset_password_usecase_1 = require("../usercases/user/reset-password.usecase");
let UserController = class UserController {
    constructor(createUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase, getAllUsersUseCase, loginUserUseCase, updatePasswordUseCase, forgotPasswordUseCase, resetPasswordUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.updatePasswordUseCase = updatePasswordUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.loginUserUseCase.execute(email, password);
                if (user) {
                    const token = yield (0, jwt_1.generateToken)(user.id_user, user.rol.id_role);
                    res.status(200).json({
                        success: true,
                        message: "User logged in",
                        data: user,
                        token,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error logging in user ${error.message}`,
                });
            }
        });
    }
    revalidateToken(req, res) {
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
                const user = yield this.getUserUseCase.execute(userId);
                if (user) {
                    const token = yield (0, jwt_1.generateToken)(userId, roleId);
                    res.status(200).json({
                        success: true,
                        message: "Token revalidated",
                        data: user,
                        token,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error revalidating token ${error.message}`,
                });
            }
        });
    }
    createUser(req, res) {
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
                const user = req.body;
                const newUser = yield this.createUserUseCase.execute(user);
                res.status(201).json({
                    success: true,
                    message: "User created",
                    data: newUser,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error creating user ${error.message}`,
                });
            }
        });
    }
    getUser(req, res) {
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
                const userIdFromParams = Number(req.params.userId);
                const user = yield this.getUserUseCase.execute(userIdFromParams);
                if (user) {
                    res.status(201).json({
                        success: true,
                        message: "User",
                        data: user,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting user ${error.message}`,
                });
            }
        });
    }
    getAllUsers(req, res) {
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
                const allUsers = yield this.getAllUsersUseCase.execute();
                res.status(201).json({
                    success: true,
                    message: "All users",
                    data: allUsers,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error getting all users ${error.message}`,
                });
            }
        });
    }
    updateUser(req, res) {
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
                const userIdFromParams = Number(req.params.userId);
                const data = req.body;
                const isUpdated = yield this.updateUserUseCase.execute(userIdFromParams, data);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "User updated successfully",
                        data: isUpdated,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating user ${error.message}`,
                });
            }
        });
    }
    deleteUser(req, res) {
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
                const userIdFromParams = Number(req.params.userId);
                const isDeleted = yield this.deleteUserUseCase.execute(userIdFromParams);
                if (isDeleted) {
                    res.status(200).json({
                        success: true,
                        message: "User deleted successfully",
                        data: isDeleted,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error deleting user ${error.message}`,
                });
            }
        });
    }
    updatePassword(req, res) {
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
                const userIdFromParams = Number(req.params.userId);
                const password = req.body.password;
                const newPassword = req.body.newPassword;
                const isUpdated = yield this.updatePasswordUseCase.execute(userIdFromParams, password, newPassword);
                if (isUpdated) {
                    res.status(200).json({
                        success: true,
                        message: "User updated successfully",
                        data: isUpdated,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating user ${error.message}`,
                });
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield this.forgotPasswordUseCase.execute(email);
                if (user) {
                    const token = yield (0, jwt_1.generateToken)(user.id_user, user.rol.id_role);
                    yield mailer_1.transporter.sendMail((0, mailer_1.forgoted)(user, token));
                    res.status(200).json({
                        success: true,
                        message: "Email sent successfully",
                        data: user,
                        token,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating user ${error.message}`,
                });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                const resetPassword = yield this.resetPasswordUseCase.execute(token, newPassword);
                if (resetPassword) {
                    res.status(200).json({
                        success: true,
                        message: "Password reset successfully",
                        data: resetPassword,
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Password could not be updated",
                        error: "Password could not be updated",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                    error: `Error updating user ${error.message}`,
                });
            }
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateUserUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetUserUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UpdateUserUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.DeleteUserUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.GetAllUsersUseCase)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.LoginUserUseCase)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.UpdatePasswordUseCase)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.ForgotPasswordUseCase)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.ResetPasswordUseCase)),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        get_user_usecase_1.GetUserUseCase,
        update_user_usecase_1.UpdateUserUseCase,
        delete_user_usecase_1.DeleteUserUseCase,
        getAll_user_usecase_1.GetAllUsersUseCase,
        login_user_usecase_1.LoginUserUseCase,
        update_password_usecase_1.UpdatePasswordUseCase,
        forgot_password_usecase_1.ForgotPasswordUseCase,
        reset_password_usecase_1.ResetPasswordUseCase])
], UserController);
exports.UserController = UserController;
