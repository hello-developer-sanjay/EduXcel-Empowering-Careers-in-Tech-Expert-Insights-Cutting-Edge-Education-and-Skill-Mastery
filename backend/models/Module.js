const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoURL: { type: String, required: true }, // URL to the module video
  imageURL: { type: String, required: true }, // URL to the module image
  content: [
    {
      title: String,
      description: String,
      videoURL: String, // URL to a video related to this content
      imageURL: String, // URL to an image related to this content
    },
  ],
});

module.exports = mongoose.model('Module', moduleSchema);
