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
exports.ActivityRepositoryImpl = void 0;
const activity_model_1 = require("../domain/models/activity.model");
const inversify_1 = require("inversify");
const db_1 = require("../db");
let ActivityRepositoryImpl = class ActivityRepositoryImpl {
    constructor() {
        this.db = db_1.AppDataSource.getRepository(activity_model_1.Activity);
    }
    createActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActivity = new activity_model_1.Activity();
            newActivity.name_activity = activity.activityName;
            newActivity.description_activity = activity.activityDescription;
            newActivity.status_activity = activity.activityStatus;
            newActivity.created_at = new Date();
            newActivity.updated_at = new Date();
            return this.db.manager.save(newActivity);
        });
    }
    getAllActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            const allActivities = yield this.db.find();
            if (!allActivities) {
                return null;
            }
            return allActivities;
        });
    }
    getActivityById(idActivity) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityById = yield this.db.findOneBy({ id_activity: idActivity });
            if (!activityById) {
                return null;
            }
            return activityById;
        });
    }
    updateActivity(idActivity, activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityToUpdate = yield this.db.findOneBy({
                id_activity: idActivity,
            });
            if (!activityToUpdate) {
                return false;
            }
            yield this.db.manager.save(Object.assign(Object.assign({}, activityToUpdate), activity));
            return Promise.resolve(true);
        });
    }
    deleteActivity(idActivity) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityToDelete = yield this.db.findOneBy({
                id_activity: idActivity,
            });
            if (!activityToDelete) {
                return false;
            }
            yield this.db.manager.remove(activityToDelete);
            return Promise.resolve(true);
        });
    }
};
ActivityRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ActivityRepositoryImpl);
exports.ActivityRepositoryImpl = ActivityRepositoryImpl;
