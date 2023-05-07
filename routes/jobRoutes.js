import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobControllers.js";

router.route("/").post(auth, createJob).get(auth, getAllJobs);
router.route("/stats").get(auth, showStats);
router.route("/:id").delete(auth, deleteJob).patch(auth, updateJob);

export default router;
