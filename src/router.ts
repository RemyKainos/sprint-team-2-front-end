import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";

import authMiddleware from "./middleware/auth";

import { JobCapabilityController } from "./controller/JobCapabilityController";
import { JobFamilyController } from "./controller/JobFamilyController";
import { JobRoleController } from "./JobRoleController"
import { JobSpecController } from "./controller/JobSpecController";


const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)

router.get('/view-job-spec/:roleId', authMiddleware, JobSpecController.get)


router.get('/select-capability', JobCapabilityController.get)
router.post('/select-capability', JobCapabilityController.post)
router.get('/family-by-capability/:id', JobFamilyController.get)
router.get('/view-roles', JobRoleController.get)
router.get('/add-capability', JobCapabilityController.getAddCapability)
router.post('/add-capability', JobCapabilityController.postAddCapability)
router.get('/error-page', JobRoleController.get)
router.get('/edit-role/:id', JobRoleController.loadEditPage)
router.put('/edit-role/:id', JobRoleController.submitEditForm)

export default router