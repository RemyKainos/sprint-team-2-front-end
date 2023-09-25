import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";
import { JobCapabilityController } from "./controller/JobCapabilityController";
import { JobFamilyController } from "./controller/JobFamilyController";
import { JobRoleController } from "./JobRoleController"

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/select-capability', JobCapabilityController.get)
router.post('/select-capability', JobCapabilityController.post)
router.get('/family-by-capability/:id', JobFamilyController.get)
router.get('/view-roles', JobRoleController.get)
//router.post('/view-roles', JobRoleController.post)
router.get('/error-page', JobRoleController.get)

export default router