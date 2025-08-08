import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

// // THIS IS THE ROUTE YOU ARE LIKELY MISSING 👇
// router.get("/:id", isAuthenticated, getMessages);

// // This is the route you probably already have
// router.post("/send/:id", isAuthenticated, sendMessage);

// This route is for SENDING a new message, so POST is correct.
router.route("/send/:id").post(isAuthenticated, sendMessage);

// This route is for GETTING messages, so it must be a GET request.
router.route("/:id").get(isAuthenticated, getMessage); // Changed from .post to .get


export default router;
