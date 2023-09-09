const mongoose = require('mongoose');

const subModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoURL: { type: String, required: true }, // URL to the submodule video
  imageURL: { type: String, required: true }, // URL to the submodule image
});

module.exports = mongoose.model('SubModule', subModuleSchema);
