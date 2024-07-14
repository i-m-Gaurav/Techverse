import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio : {type:String},
  email: { type: String, required: true, unique: true },
  image: { type: String },
  city: { type: String },
  phone: { type: String },  // Changed from phoneNumber to phone
  github: { type: String },
  instagram: { type: String },
  twitter: { type: String }
}) // Added strict: false to allow fields not in the schema

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;