import express from "express";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";


import { JobCapabilityController } from "./controller/JobCapabilityController";
import { JobFamilyController } from "./controller/JobFamilyController";
import { JobRoleController } from "./JobRoleController"
import { role, login } from "./middleware/auth";
import { JobSpecController } from "./controller/JobSpecController";


const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)

router.get('/view-job-spec/:roleId', role("Employee"), login, JobSpecController.get)


router.get('/select-capability',role("Employee"), JobCapabilityController.get)
router.post('/select-capability', role("Employee"), JobCapabilityController.post)
router.get('/family-by-capability/:id', role("Employee"), JobFamilyController.get)
router.get('/view-roles', role("Employee"), JobRoleController.get)
router.get('/logout', role("Employee"), LoginController.logOut)
router.get('/add-capability', role("Admin"), JobCapabilityController.getAddCapability)
router.post('/add-capability', role("Admin"), JobCapabilityController.postAddCapability)

router.get('/select-capability', JobCapabilityController.get)
router.post('/select-capability', JobCapabilityController.post)
router.get('/family-by-capability/:id', JobFamilyController.get)
router.get('/view-roles', JobRoleController.get)
router.post('/view-roles', JobRoleController.post)
router.get('/delete-job-role/:id', JobRoleController.getDelete)
router.post('/delete-job-role', JobRoleController.postDelete)
router.get('/add-capability', JobCapabilityController.getAddCapability)
router.post('/add-capability', JobCapabilityController.postAddCapability)
router.get('/error-page', JobRoleController.get)

export default router