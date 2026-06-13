import type { Request, Response } from "express";
import type { bookDetails } from "../interfaces/book.interface.js";
import bookModels from "../models/book.model.js";

class bookController {
  static async addBookController(
    req: Request<{}, {}, bookDetails>,
    res: Response,
  ): Promise<Response | void> {
    try {
      const { bookName, bookTitle, bookPrice, authorName } = req.body;
      if (!bookName || !bookTitle || !bookPrice || !authorName) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      const result = await bookModels.addBookModel(req.body)

      res.status(200).json(result)



    } catch (error: unknown) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: `Internal Server Error`,
      });
    }
  }
}

export default bookController;