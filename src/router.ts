import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";
import { JobSpecController } from "./controller/JobSpecController";
import authMiddleware from "./middleware/auth";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/view-job-spec/:roleId', authMiddleware, JobSpecController.get)


export default router