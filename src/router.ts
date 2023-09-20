import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";


const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)


export default router