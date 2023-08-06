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
exports.RoleRepositoryImpl = void 0;
const role_model_1 = require("../domain/models/role.model");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const activity_model_1 = require("../domain/models/activity.model");
let RoleRepositoryImpl = class RoleRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(role_model_1.Role);
        this.dbActivities = db_1.AppDataSource.getRepository(activity_model_1.Activity);
    }
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.dbActivities.findBy({
                id_activity: (0, typeorm_1.In)(role.activities),
            });
            const newRole = new role_model_1.Role();
            newRole.name_role = role.nameRole;
            newRole.description_role = role.descriptionRole;
            newRole.status_role = role.statusRole;
            newRole.created_at = new Date();
            newRole.updated_at = new Date();
            newRole.activities = activity;
            return this.db.manager.save(newRole);
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const allRoles = yield this.db
                .createQueryBuilder("role")
                .leftJoinAndSelect("role.activities", "activity")
                .getMany();
            if (!allRoles) {
                return null;
            }
            return allRoles;
        });
    }
    getRoleById(idRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.db
                .createQueryBuilder("role")
                .leftJoinAndSelect("role.activities", "activity")
                .where("role.id_role = :idRole", { idRole: idRole })
                .getMany();
            if (!roles) {
                return null;
            }
            return roles;
        });
    }
    updateRole(idRole, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleToUpdate = yield this.db.findOneByOrFail({ id_role: idRole });
            if (!roleToUpdate) {
                throw new Error("Role not found");
            }
            roleToUpdate.id_role = idRole;
            roleToUpdate.name_role = role.nameRole;
            roleToUpdate.description_role = role.descriptionRole;
            roleToUpdate.status_role = role.statusRole;
            roleToUpdate.updated_at = new Date();
            roleToUpdate.activities = yield this.dbActivities.findBy({
                id_activity: (0, typeorm_1.In)(role.activities),
            });
            return yield this.db.manager.save(roleToUpdate);
        });
    }
    deleteRole(idRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleToDelete = yield this.db.findOneByOrFail({ id_role: idRole });
            if (!roleToDelete) {
                return false;
            }
            yield this.db.manager.remove(roleToDelete);
            return Promise.resolve(true);
        });
    }
};
RoleRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], RoleRepositoryImpl);
exports.RoleRepositoryImpl = RoleRepositoryImpl;
