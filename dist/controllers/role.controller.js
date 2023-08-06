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
exports.RoleController = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const create_role_usecase_1 = require("../usercases/role/create-role.usecase");
const getall_role_usecase_1 = require("../usercases/role/getall-role.usecase");
const get_role_usecase_1 = require("../usercases/role/get-role.usecase");
const update_role_usecase_1 = require("../usercases/role/update-role.usecase");
const delete_role_usecase_1 = require("../usercases/role/delete-role.usecase");
let RoleController = class RoleController {
    constructor(createRoleUseCase, getAllRolesUseCase, getRoleUseCase, updateRoleUseCase, deleteRoleUseCase) {
        this.createRoleUseCase = createRoleUseCase;
        this.getAllRolesUseCase = getAllRolesUseCase;
        this.getRoleUseCase = getRoleUseCase;
        this.updateRoleUseCase = updateRoleUseCase;
        this.deleteRoleUseCase = deleteRoleUseCase;
    }
    createRole(req, res) {
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
                const role = req.body;
                const newRole = yield this.createRoleUseCase.execute(role);
                res.status(201).json({
                    success: true,
                    message: "Role created successfully",
                    data: newRole,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating role",
                    error: `Error creating role ${error.message}`,
                });
            }
        });
    }
    getAllRoles(req, res) {
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
                const allRoles = yield this.getAllRolesUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: "All roles",
                    data: allRoles,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error getting all roles",
                    error: `Error getting all roles ${error.message}`,
                });
            }
        });
    }
    getRole(req, res) {
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
                const idRole = Number(req.params.idRole);
                const role = yield this.getRoleUseCase.execute(idRole);
                res.status(200).json({
                    success: true,
                    message: "Role",
                    data: role,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error getting role",
                    error: `Error getting role ${error.message}`,
                });
            }
        });
    }
    updateRole(req, res) {
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
                const idRole = Number(req.params.idRole);
                const role = req.body;
                const roleUpdated = yield this.updateRoleUseCase.execute(idRole, role);
                res.status(200).json({
                    success: true,
                    message: "Role updated successfully",
                    data: roleUpdated,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error updating role",
                    error: `Error updating role ${error.message}`,
                });
            }
        });
    }
    deleteRole(req, res) {
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
                const idRole = Number(req.params.idRole);
                const roleDeleted = yield this.deleteRoleUseCase.execute(idRole);
                res.status(200).json({
                    success: true,
                    message: "Role deleted successfully",
                    data: roleDeleted,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error deleting role",
                    error: `Error deleting role ${error.message}`,
                });
            }
        });
    }
};
RoleController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateRoleUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllRolesUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetRoleUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UpdateRoleUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DeleteRoleUseCase)),
    __metadata("design:paramtypes", [create_role_usecase_1.CreateRoleUseCase,
        getall_role_usecase_1.GetAllRolesUseCase,
        get_role_usecase_1.GetRoleUseCase,
        update_role_usecase_1.UpdateRoleUseCase,
        delete_role_usecase_1.DeleteRoleUseCase])
], RoleController);
exports.RoleController = RoleController;
