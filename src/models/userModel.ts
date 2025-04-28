
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  qualification: string;
  points: number;
  completedCourses: string[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    completedCourses: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Password encryption middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
