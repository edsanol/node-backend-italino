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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const db_1 = require("../db");
const user_model_1 = require("../domain/models/user.model");
const inversify_1 = require("inversify");
const role_model_1 = require("../domain/models/role.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = require("../utils/mailer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(user_model_1.User);
        this.dbRole = db_1.AppDataSource.getRepository(role_model_1.Role);
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByEmail = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.email_user = :email_user", { email_user: email })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userByEmail) {
                return null;
            }
            const isMatch = yield bcrypt_1.default.compare(password, userByEmail.password_user);
            if (!isMatch) {
                return null;
            }
            return userByEmail;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .getMany();
            if (!allUsers) {
                return null;
            }
            return allUsers;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.dbRole.findOneByOrFail({ id_role: user.roleId });
            // Encrypta la contraseña
            const encryptPassword = yield bcrypt_1.default.hash(user.passwordUser, 8);
            const newUser = new user_model_1.User();
            newUser.name_user = user.nameUser;
            newUser.phone_user = user.phoneUser;
            newUser.password_user = encryptPassword;
            newUser.status_user = user.statusUser;
            newUser.email_user = user.emailUser;
            newUser.created_at = new Date();
            newUser.updated_at = new Date();
            newUser.rol = role;
            const userCreated = yield this.db.manager.save(newUser);
            const userById = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.id_user = :id_user", { id_user: userCreated.id_user })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userById) {
                return null;
            }
            const result = {
                id_user: userById.id_user,
                name_user: userById.name_user,
                phone_user: userById.phone_user,
                email_user: userById.email_user,
                status_user: userById.status_user,
                rol: {
                    id_role: userById.rol.id_role,
                    name_role: userById.rol.name_role,
                    description_role: userById.rol.description_role,
                    status_role: userById.rol.status_role,
                    activities: userById.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userById = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.id_user = :id_user", { id_user: userId })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userById) {
                return null;
            }
            const result = {
                id_user: userById.id_user,
                name_user: userById.name_user,
                phone_user: userById.phone_user,
                email_user: userById.email_user,
                status_user: userById.status_user,
                rol: {
                    id_role: userById.rol.id_role,
                    name_role: userById.rol.name_role,
                    description_role: userById.rol.description_role,
                    status_role: userById.rol.status_role,
                    activities: userById.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this.db.findOneByOrFail({ id_user: userId });
            if (!userToUpdate) {
                throw new Error("User not found");
            }
            userToUpdate.id_user = userId;
            userToUpdate.name_user = data.nameUser;
            userToUpdate.phone_user = data.phoneUser;
            userToUpdate.email_user = data.emailUser;
            userToUpdate.status_user = data.statusUser;
            userToUpdate.rol = yield this.dbRole.findOneByOrFail({
                id_role: data.roleId,
            });
            userToUpdate.updated_at = new Date();
            yield this.db.manager.save(userToUpdate);
            const userById = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.id_user = :id_user", { id_user: userId })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userById) {
                throw new Error("User not found");
            }
            const result = {
                id_user: userById.id_user,
                name_user: userById.name_user,
                phone_user: userById.phone_user,
                email_user: userById.email_user,
                status_user: userById.status_user,
                created_at: userById.created_at,
                updated_at: userById.updated_at,
                rol: {
                    id_role: userById.rol.id_role,
                    name_role: userById.rol.name_role,
                    description_role: userById.rol.description_role,
                    status_role: userById.rol.status_role,
                    activities: userById.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
    updatePassword(userId, password, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this.db.findOneByOrFail({ id_user: userId });
            if (!userToUpdate) {
                throw new Error("User not found");
            }
            const isMatch = yield bcrypt_1.default.compare(password, userToUpdate.password_user);
            if (!isMatch) {
                throw new Error("Password incorrect");
            }
            const encryptPassword = yield bcrypt_1.default.hash(newPassword, 8);
            userToUpdate.password_user = encryptPassword;
            userToUpdate.updated_at = new Date();
            yield this.db.manager.save(userToUpdate);
            const userById = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.id_user = :id_user", { id_user: userId })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userById) {
                throw new Error("User not found");
            }
            const result = {
                id_user: userById.id_user,
                name_user: userById.name_user,
                phone_user: userById.phone_user,
                email_user: userById.email_user,
                status_user: userById.status_user,
                created_at: userById.created_at,
                updated_at: userById.updated_at,
                rol: {
                    id_role: userById.rol.id_role,
                    name_role: userById.rol.name_role,
                    description_role: userById.rol.description_role,
                    status_role: userById.rol.status_role,
                    activities: userById.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToDelete = yield this.db.findOneBy({ id_user: userId });
            if (!userToDelete) {
                return false;
            }
            yield this.db.manager.remove(userToDelete);
            return Promise.resolve(true);
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this.db.findOneByOrFail({ email_user: email });
            if (!userToUpdate) {
                throw new Error("User not found");
            }
            const userByEmail = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.email_user = :email_user", { email_user: email })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userByEmail) {
                throw new Error("User not found");
            }
            const result = {
                id_user: userByEmail.id_user,
                name_user: userByEmail.name_user,
                phone_user: userByEmail.phone_user,
                email_user: userByEmail.email_user,
                status_user: userByEmail.status_user,
                created_at: userByEmail.created_at,
                updated_at: userByEmail.updated_at,
                rol: {
                    id_role: userByEmail.rol.id_role,
                    name_role: userByEmail.rol.name_role,
                    description_role: userByEmail.rol.description_role,
                    status_role: userByEmail.rol.status_role,
                    activities: userByEmail.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.TOKEN_SECRET_KEY));
            const idUser = decoded.id;
            const userToUpdate = yield this.db.findOneByOrFail({
                id_user: idUser,
            });
            if (!userToUpdate) {
                throw new Error("User not found");
            }
            const encryptPassword = yield bcrypt_1.default.hash(newPassword, 8);
            userToUpdate.password_user = encryptPassword;
            userToUpdate.updated_at = new Date();
            yield this.db.manager.save(userToUpdate);
            yield mailer_1.transporter.sendMail((0, mailer_1.passwordChanged)(userToUpdate));
            const userById = yield this.db
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.rol", "rol")
                .where("user.id_user = :id_user", { id_user: idUser })
                .leftJoinAndSelect("rol.activities", "activities")
                .getOne();
            if (!userById) {
                throw new Error("User not found");
            }
            const result = {
                id_user: userById.id_user,
                name_user: userById.name_user,
                phone_user: userById.phone_user,
                email_user: userById.email_user,
                status_user: userById.status_user,
                created_at: userById.created_at,
                updated_at: userById.updated_at,
                rol: {
                    id_role: userById.rol.id_role,
                    name_role: userById.rol.name_role,
                    description_role: userById.rol.description_role,
                    status_role: userById.rol.status_role,
                    activities: userById.rol.activities.map((activity) => ({
                        id_activity: activity.id_activity,
                        name_activity: activity.name_activity,
                        description_activity: activity.description_activity,
                        status_activity: activity.status_activity,
                    })),
                },
            };
            return result;
        });
    }
};
UserRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserRepositoryImpl);
exports.UserRepositoryImpl = UserRepositoryImpl;
