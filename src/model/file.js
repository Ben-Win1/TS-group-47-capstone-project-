const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      default: 'general',
    },
    resourceType: {
      type: String,
      enum: ['image', 'video', 'raw', 'auto'],
      default: 'auto',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);