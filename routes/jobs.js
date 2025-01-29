const express = require("express");
const router = express.Router();
const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJobsByIdAndSlug,
  jobStats,
} = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);

router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);

router.route("/job/new").post(newJob);

router.route("/job/:id").put(updateJob).delete(deleteJob);

router.route("/job/:id/:slug").get(getJobsByIdAndSlug);

router.route("/stats/:topic").get(jobStats);

module.exports = router;
