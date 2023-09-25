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
router.get('/delete-job-role/:id', JobRoleController.getDelete)
router.post('/delete-job-role', JobRoleController.postDelete)

// TODO: REMOVE
router.get('/temp-delete-job-role', JobRoleController.getTemp)
router.post('/temp-delete-job-role', JobRoleController.postTemp)

export default router