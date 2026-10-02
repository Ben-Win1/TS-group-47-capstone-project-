const mongoose = require('mongoose');
const crypto = require('crypto');

const webhookSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    secret: {
      type: String,
      required: true,
      default: () => crypto.randomBytes(32).toString('hex'),
    },
    events: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    failureCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Webhook', webhookSchema);