import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").post(isAuthenticated,getMessage);


export default router;