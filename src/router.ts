import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";
import { JobCapabilityController } from "./controller/JobCapabilityController";
import { JobFamilyController } from "./controller/JobFamilyController";
import { JobRoleController } from "./JobRoleController"
import { role } from "./middleware/auth";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/select-capability', JobCapabilityController.get)
router.post('/select-capability', JobCapabilityController.post)
router.get('/family-by-capability/:id', JobFamilyController.get)
router.get('/view-roles', role("Employee"), JobRoleController.get)
router.get('/logout', LoginController.logOut)

export default router