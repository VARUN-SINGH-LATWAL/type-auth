import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  userName: string;
  email: string;
  role: string;
}

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"];

  const token = accessToken?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  const decoded =  jwt.verify(token, "Varun_Latwal") as UserPayload;

  console.log(decoded);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  req.userInfo = decoded;

  next();
};

export default handleAuth;
