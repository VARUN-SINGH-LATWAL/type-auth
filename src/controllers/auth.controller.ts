import { json } from "node:stream/consumers";
import authModel from "../models/auth.model.js";
import type { Request, Response } from "express";

class authController {
  static async registerController(req: Request, res: Response) {
    try {
      const { userName, email, role, password } = req.body;
      console.log(req.body)

      if (!userName || !email || !role || !password) {
        return res.status(500).json({
            message : 'please proved valid Data'
        })
      }

      const result = await authModel.registerModel(
        userName,
        email,
        role,
        password,
      );

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(409).json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
}

export default authController;
