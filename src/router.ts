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
router.post('/view-roles', role("Employee"),JobRoleController.post)
router.get('/delete-job-role/:id',role("Admin"), JobRoleController.getDelete)
router.post('/delete-job-role', role("Admin"), JobRoleController.postDelete)
router.get('/logout', role("Employee"), LoginController.logOut)
router.get('/add-capability', role("Admin"), JobCapabilityController.getAddCapability)
router.post('/add-capability', role("Admin"), JobCapabilityController.postAddCapability)
router.get('/error-page', JobRoleController.get)
router.get('/edit-job-role/:id', role("Admin"), JobRoleController.getEdit);
router.post('/edit-job-role/', role("Admin"), JobRoleController.putEdit);

export default router