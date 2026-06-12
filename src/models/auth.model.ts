import connection from "../DB/access.js";
import bcrypt from "bcrypt";
import type {RegisterBody, LoginBody, User} from "../interfaces/auth.interface.js"
import type {ApiResponse, ApiResponseLogin} from "./../interfaces/api.interface.js"
import jwt from "jsonwebtoken"

class authModel {

  static async registerModel(
   data: RegisterBody
  ): Promise<ApiResponse> {
    try {
      const { userName, email, password, role } = data;

      const checkQuery = `SELECT * FROM users WHERE userName = "${userName}"`;
      const result = (await connection.query(checkQuery)) as RegisterBody[];
      if (result.length > 0) {
        return {
          message: "User already exists",
          success: false,
        };
      }

      const hash:string = await bcrypt.hash(password, 10);

      const query = `INSERT INTO users
        (userName, email, [password], [role])
        VALUES ("${userName}", "${email}", "${hash}", "${role}")`;
      await connection.execute(query);

      return {
        message: "User Created Successfuly!",
        success: true,
      };
    } catch (error: unknown) {
        throw error;
    }
  }

  static async loginModel (data : LoginBody): Promise<ApiResponseLogin> {
    try {
      const {userName, password} = data

      const checkUser = `SELECT * FROM users Where userName="${userName}"`
      const result = (await connection.query(checkUser)) as User[];

      if (result.length === 0) {
        return {
          success : false,
          message : "User not found! (user)"
        }
      }

      const user = result[0]!;

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (!isMatchPassword) {
        return {
          success : false,
          message : "Invalid credentials! (password)"
        }
      }

      const accessToken =  await jwt.sign({
        userName : user.userName,
        email : user.email,
        role : user.role
      },"Varun_Latwal",{expiresIn : '1h'})

      console.log(accessToken,"accessToken")
       return {
          success : true,
          message : "Login Successful.",
          accessToken
        }


    } catch (error : unknown) {
      throw error
    }
  }
}

export default authModel;
