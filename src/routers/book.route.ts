import express from "express"
import type { Router } from "express";
import bookController from "../controllers/book.controller.js";
import handleAuth from "../middlewares/auth.middleware.js";

const router: Router = express.Router()

router.post('/addBook',handleAuth, bookController.addBookController)

export default router;