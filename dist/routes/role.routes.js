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
exports.RoleRoutes = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const role_controller_1 = require("../controllers/role.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let RoleRoutes = class RoleRoutes {
    constructor(roleController) {
        this.roleController = roleController;
    }
    configureRoutes(router) {
        router.post("/role", validate_jwt_1.validateJWT, this.roleController.createRole.bind(this.roleController));
        router.get("/role", validate_jwt_1.validateJWT, this.roleController.getAllRoles.bind(this.roleController));
        router.get("/role/:idRole", validate_jwt_1.validateJWT, this.roleController.getRole.bind(this.roleController));
        router.put("/role/:idRole", validate_jwt_1.validateJWT, this.roleController.updateRole.bind(this.roleController));
        router.delete("/role/:idRole", validate_jwt_1.validateJWT, this.roleController.deleteRole.bind(this.roleController));
    }
};
RoleRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.RoleController)),
    __metadata("design:paramtypes", [role_controller_1.RoleController])
], RoleRoutes);
exports.RoleRoutes = RoleRoutes;
