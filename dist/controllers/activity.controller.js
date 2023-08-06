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
exports.ActivityController = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const create_activity_usecase_1 = require("../usercases/activity/create-activity.usecase");
const getall_activity_usecase_1 = require("../usercases/activity/getall-activity.usecase");
const get_activity_usecase_1 = require("../usercases/activity/get-activity.usecase");
const update_activity_usecase_1 = require("../usercases/activity/update-activity.usecase");
const delete_activity_usecase_1 = require("../usercases/activity/delete-activity.usecase");
let ActivityController = class ActivityController {
    constructor(createActivityUseCase, getAllActivitiesUseCase, getActivityUseCase, updateActivityUseCase, deleteActivityUseCase) {
        this.createActivityUseCase = createActivityUseCase;
        this.getAllActivitiesUseCase = getAllActivitiesUseCase;
        this.getActivityUseCase = getActivityUseCase;
        this.updateActivityUseCase = updateActivityUseCase;
        this.deleteActivityUseCase = deleteActivityUseCase;
    }
    createActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = req.body;
                const newActivity = yield this.createActivityUseCase.execute(activity);
                res.status(201).json({
                    success: true,
                    message: "Activity created successfully",
                    data: newActivity,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error creating activity",
                    error: `Error creating activity ${error.message}`,
                });
            }
        });
    }
    getAllActivities(req, res) {
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
                const allActivities = yield this.getAllActivitiesUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: "Activities obtained successfully",
                    data: allActivities,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error obtaining activities",
                    error: `Error obtaining activities ${error.message}`,
                });
            }
        });
    }
    getActivity(req, res) {
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
                const idActivity = Number(req.params.idActivity);
                const activity = yield this.getActivityUseCase.execute(idActivity);
                res.status(200).json({
                    success: true,
                    message: "Activity obtained successfully",
                    data: activity,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error obtaining activity",
                    error: `Error obtaining activity ${error.message}`,
                });
            }
        });
    }
    updateActivity(req, res) {
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
                const idActivity = Number(req.params.idActivity);
                const activity = req.body;
                const isUpdated = yield this.updateActivityUseCase.execute(idActivity, activity);
                res.status(200).json({
                    success: true,
                    message: "Activity updated successfully",
                    data: isUpdated,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error updating activity",
                    error: `Error updating activity ${error.message}`,
                });
            }
        });
    }
    deleteActivity(req, res) {
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
                const idActivity = Number(req.params.idActivity);
                const isDeleted = yield this.deleteActivityUseCase.execute(idActivity);
                res.status(200).json({
                    success: true,
                    message: "Activity deleted successfully",
                    data: isDeleted,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error deleting activity",
                    error: `Error deleting activity ${error.message}`,
                });
            }
        });
    }
};
ActivityController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CreateActivityUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.GetAllActivitiesUseCase)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.GetActivityUseCase)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UpdateActivityUseCase)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DeleteActivityUseCase)),
    __metadata("design:paramtypes", [create_activity_usecase_1.CreateActivityUseCase,
        getall_activity_usecase_1.GetAllActivityUseCase,
        get_activity_usecase_1.GetActivityUseCase,
        update_activity_usecase_1.UpdateActivityUseCase,
        delete_activity_usecase_1.DeleteActivityUseCase])
], ActivityController);
exports.ActivityController = ActivityController;
