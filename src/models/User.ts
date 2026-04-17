import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  universityName: string;
  enrollmentNumber: string;
  techStackPreference: string;
  avatar?: string;
  universityLogo?: string;
  bio?: string;
  skills: string[];
  location?: string;
  role: "admin" | "leader" | "member" | "pixel_head" | "project_lead" | "pixel_member" | "normal_user";
  currentStartup?: mongoose.Types.ObjectId;
  reputation: number;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    universityName: {
      type: String,
      required: [true, "University name is required"],
    },
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required"],
    },
    techStackPreference: {
      type: String,
      required: [true, "Tech stack preference is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    universityLogo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "leader", "member", "pixel_head", "project_lead", "pixel_member", "normal_user"],
      default: "member",
    },
    currentStartup: {
      type: Schema.Types.ObjectId,
      ref: "Startup",
      default: null,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
