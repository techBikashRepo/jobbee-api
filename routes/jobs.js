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
  supportedFiles,
  applyJob,
} = require("../controllers/jobsController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/jobs").get(getJobs);

router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);

router
  .route("/job/new")
  .post(isAuthenticatedUser, authorizeRoles("employeer", "admin"), newJob);

router
  .route("/job/:id/apply")
  .put(isAuthenticatedUser, authorizeRoles("user"), applyJob);

router
  .route("/job/:id")
  .put(isAuthenticatedUser, authorizeRoles("employeer", "admin"), updateJob)
  .delete(isAuthenticatedUser, authorizeRoles("employeer", "admin"), deleteJob);

router.route("/job/:id/:slug").get(getJobsByIdAndSlug);

router.route("/stats/:topic").get(jobStats);

module.exports = router;
