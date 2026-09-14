const express = require("express");
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getStats
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { applicationSchema } = require("../validators/applicationValidator");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(applicationSchema), createApplication);
router.get("/", getApplications);
router.get("/stats", getStats);
router.get("/:id", getApplicationById);
router.put("/:id", validate(applicationSchema), updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
