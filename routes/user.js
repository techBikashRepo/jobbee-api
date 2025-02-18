const exxpress = require("express");
const router = exxpress.Router();

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getAppliedJobs,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/me").get(isAuthenticatedUser, getUserProfile);

router
  .route("/jobs/applied")
  .get(isAuthenticatedUser, authorizeRoles, getAppliedJobs);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateUser);

router.route("/me/delete").delete(isAuthenticatedUser, deleteUser);

module.exports = router;
