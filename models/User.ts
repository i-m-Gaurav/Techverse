// models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  bio: String
});

export default mongoose.models.User || mongoose.model('User', UserSchema);