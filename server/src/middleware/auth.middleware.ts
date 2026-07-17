import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../config/firebaseAdmin";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
}

export const verifyFirebaseToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const token = authorization.split("Bearer ")[1];

    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};