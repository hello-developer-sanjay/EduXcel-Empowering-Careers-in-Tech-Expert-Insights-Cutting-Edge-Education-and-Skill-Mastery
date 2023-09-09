const express = require("express");
const router = express.Router();
const Query = require("../models/queryModel.js"); // Adjust the path as needed

router.post("/", async (req, res) => {
  try {
    const { name, email, query } = req.body;

    const newQuery = new Query({
      name,
      email,
      query,
    });
    await newQuery.save();

    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ error: "Error submitting query" });
  }
});

module.exports = router;