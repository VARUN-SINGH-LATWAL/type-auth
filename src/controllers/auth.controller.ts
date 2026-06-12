import authModel from "../models/auth.model.js";
import type { Request, Response } from "express";
import  type {RegisterBody, LoginBody} from "./../interfaces/auth.interface.js"
import type { promises } from "node:dns";


class authController {
  static async registerController(
    req: Request<{}, {}, RegisterBody>,
    res: Response,
  ): Promise<Response | void> {
    try {
      const { userName, email, password } = req.body;

      if (!userName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      const result = await authModel.registerModel(req.body);



      return res.status(result.success ? 201 : 409).json(result);
    } catch (error : unknown) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }

  static async loginController(req: Request<{},{}, LoginBody>, res: Response): Promise<Response | void>{
    try {
      const {userName, password} = req.body;

       if (!userName || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      const result = await authModel.loginModel(req.body)
      return res.status(result.success ? 201 : 401).json(result);

    } catch (error: unknown) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  }

}

export default authController;
