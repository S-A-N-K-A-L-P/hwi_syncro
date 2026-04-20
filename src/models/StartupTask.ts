import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IStartupTask extends Document {
  startupId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  assignedTo?: mongoose.Types.ObjectId;
  status: "pending" | "in-progress" | "completed" | "delayed";
  priority: "low" | "medium" | "high";
  isAI: boolean;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StartupTaskSchema = new Schema(
  {
    startupId: {
      type: Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "delayed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isAI: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const StartupTask = models.StartupTask || model<IStartupTask>("StartupTask", StartupTaskSchema);

export default StartupTask;
