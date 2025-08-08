import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

// THIS IS THE ROUTE YOU ARE LIKELY MISSING 👇
router.get("/:id", isAuthenticated, getMessages);

// This is the route you probably already have
router.post("/send/:id", isAuthenticated, sendMessage);


export default router;
