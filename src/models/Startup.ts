import mongoose, { Schema, model, models } from "mongoose";

const StartupSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Startup name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack is required"],
    },
    requiredRoles: {
      type: [String],
      default: ["Developer", "Designer"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    inviteCode: {
      type: String,
      unique: true,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    logo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["ideation", "mvp", "scaling", "launched"],
      default: "ideation",
    }
  },
  {
    timestamps: true,
  }
);

const Startup = models.Startup || model("Startup", StartupSchema);

export default Startup;
