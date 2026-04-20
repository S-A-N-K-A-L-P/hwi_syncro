import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IStartup extends Document {
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  requiredRoles: string[];
  createdBy: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  inviteCode: string;
  visibility: "public" | "private";
  logo?: string;
  status: "ideation" | "prototype" | "user_gathering" | "revenue" | "expanding" | "mvp" | "scaling" | "launched";
  registrationType: "pvt_ltd" | "llp" | "unregistered";
  createdAt: Date;
  updatedAt: Date;
}

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
    primaryTechnology: {
      type: String,
      required: [true, "Primary technology is required"],
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
      enum: ["ideation", "prototype", "user_gathering", "revenue", "expanding", "mvp", "scaling", "launched"],
      default: "ideation",
    },
    registrationType: {
      type: String,
      enum: ["pvt_ltd", "llp", "unregistered"],
      default: "unregistered",
    }
  },
  {
    timestamps: true,
  }
);

const Startup = models.Startup || model<IStartup>("Startup", StartupSchema);

export default Startup;
