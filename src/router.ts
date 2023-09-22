import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";
import { JobRoleController } from "./JobRoleController"


const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/view-roles', JobRoleController.get)
router.get('/error-page', JobRoleController.get)

export default router