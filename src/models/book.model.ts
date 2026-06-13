import connection from "../DB/access.js";
import type { bookDetails } from "../interfaces/book.interface.js";
import type { ApiResponse } from "../interfaces/api.interface.js";

class bookModels {
  static async addBookModel(data: bookDetails): Promise<ApiResponse> {
    try {
        
      const query = `INSERT INTO books (bookName, bookTitle, bookPrice, authorName) 
                     VALUES ("${data.bookName}", "${data.bookTitle}", ${data.bookPrice}, "${data.authorName}")`;
      await connection.execute(query);

      return {
        success: true,
        message: "Book insert successful.",
      };
    } catch (error: unknown) {
      throw error;
    }
  }
}

export default bookModels;
