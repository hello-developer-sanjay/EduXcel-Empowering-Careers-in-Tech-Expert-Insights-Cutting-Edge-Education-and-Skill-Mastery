const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true }, // URL to the course image
  videoURL: { type: String, required: true }, // URL to the course video
  syllabus: [
    {
      module: String,
      submodules: [
        {
          title: String,
          description: String,
          videoURL: String, // URL to a video related to this submodule
          imageURL: String, // URL to an image related to this submodule
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);
