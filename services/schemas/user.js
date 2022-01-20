const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: { type: String, default: null },
    phone: { type: Number, required: [true, 'Phone is required'] },
    confirmed: { type: Boolean, default: false },
    password: { type: String, required: [true, 'Password is required'] },
    address: { type: String },
    // pets: {type: Schema.Types.ObjectId.Pets},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
