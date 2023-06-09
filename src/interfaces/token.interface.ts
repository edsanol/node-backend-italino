import { Request } from "express";

export interface RequestToToken extends Request {
  userId?: number;
  roleId?: number;
}
