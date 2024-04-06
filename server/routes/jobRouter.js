import express from 'express';
import {getAllJobs, deleteJob, getMyJobs, postJob, updateJob} from '../controllers/jobController.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();
router.get("/alljobs", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.post("/getmyjobs", isAuthorized, getMyJobs);
router.post("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);

export default router;