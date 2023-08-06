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
exports.ActivityRoutes = void 0;
const types_1 = require("../config/types");
const inversify_1 = require("inversify");
const activity_controller_1 = require("../controllers/activity.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
let ActivityRoutes = class ActivityRoutes {
    constructor(activityController) {
        this.activityController = activityController;
    }
    configureRoutes(router) {
        router.post("/activity", this.activityController.createActivity.bind(this.activityController));
        router.get("/activity", validate_jwt_1.validateJWT, this.activityController.getAllActivities.bind(this.activityController));
        router.get("/activity/:idActivity", validate_jwt_1.validateJWT, this.activityController.getActivity.bind(this.activityController));
        router.put("/activity/:idActivity", validate_jwt_1.validateJWT, this.activityController.updateActivity.bind(this.activityController));
        router.delete("/activity/:idActivity", validate_jwt_1.validateJWT, this.activityController.deleteActivity.bind(this.activityController));
    }
};
ActivityRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ActivityController)),
    __metadata("design:paramtypes", [activity_controller_1.ActivityController])
], ActivityRoutes);
exports.ActivityRoutes = ActivityRoutes;
