const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;