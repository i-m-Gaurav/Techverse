import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    image: String,
    city: String,
    phone: String,
   
  });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;