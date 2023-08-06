"use strict";
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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
            error: `No token provided`,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.TOKEN_SECRET_KEY));
        req.userId = decoded.id;
        req.roleId = decoded.roleId;
        next();
    }
    catch (err) {
        console.log("error", err);
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            error: `Invalid token`,
        });
    }
});
exports.validateJWT = validateJWT;
