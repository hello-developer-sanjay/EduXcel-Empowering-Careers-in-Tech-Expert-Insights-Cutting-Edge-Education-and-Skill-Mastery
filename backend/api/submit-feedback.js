const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel.js").default; // Adjust the path as needed

router.post("/", async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

module.exports = router;