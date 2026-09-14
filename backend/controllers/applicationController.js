const mongoose = require("mongoose");
const JobApplication = require("../models/JobApplication");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const createApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Application created successfully.",
      application
    });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find({ user: req.user.id })
      .sort({ appliedDate: -1, createdAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID."
      });
    }

    const application = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found."
      });
    }

    res.json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID."
      });
    }

    const application = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found."
      });
    }

    res.json({
      success: true,
      message: "Application updated successfully.",
      application
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID."
      });
    }

    const application = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found."
      });
    }

    res.json({
      success: true,
      message: "Application deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const result = await JobApplication.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const stats = {
      total: 0,
      applied: 0,
      interview: 0,
      rejected: 0,
      offer: 0,
      withdrawn: 0
    };

    result.forEach((item) => {
      stats.total += item.count;
      const key = item._id.toLowerCase();

      if (Object.prototype.hasOwnProperty.call(stats, key)) {
        stats[key] = item.count;
      }
    });

    res.json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getStats
};
