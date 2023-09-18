import express from "express";
import { LoginController } from "./LoginController";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);

export default router