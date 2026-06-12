import connection from "../DB/access.js";
import bcrypt from "bcrypt";

interface AuthResponse {
  message: string;
  success: boolean;
}

class authModel {
    
  static async registerModel(
    userName: string,
    email: string,
    password: string,
    role: string,
  ):  Promise<AuthResponse> {
    try {
      const checkQuery = `SELECT * FROM users WHERE userName = "${userName}"`;
      const result : any[] = await connection.query(checkQuery);
      if (result.length > 0) {
        return {
          message: "User already exists",
          success: false,
        };
      }

      const hash = await bcrypt.hash(password, 10);

      const query = `INSERT INTO users
        (userName, email, [password], [role])
        VALUES ("${userName}", "${email}", "${hash}", "${role || "user"}")`;
      await connection.execute(query);

      return {
        message: "User Created Successfuly!",
        success: true,
      };
    } catch (error:unknown) {
       if (error instanceof Error) {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export default authModel;
