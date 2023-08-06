import { NextFunction, Response } from "express";
import { RequestToToken } from "interfaces/token.interface";
import jwt from "jsonwebtoken";

export const validateJWT = async (
  req: RequestToToken,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
      error: `No token provided`,
    });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      String(process.env.TOKEN_SECRET_KEY)
    );
    req.userId = decoded.id;
    req.roleId = decoded.roleId;
    next();
  } catch (err) {
    console.log("error", err);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: `Invalid token`,
    });
  }
};
