import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IMembershipRequest extends Document {
  userId: mongoose.Types.ObjectId;
  startupId: mongoose.Types.ObjectId;
  role: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const MembershipRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startupId: {
      type: Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate pending requests from same user to same startup
MembershipRequestSchema.index({ userId: 1, startupId: 1, status: 1 }, { 
  unique: true, 
  partialFilterExpression: { status: "pending" } 
});

const MembershipRequest = models.MembershipRequest || model<IMembershipRequest>("MembershipRequest", MembershipRequestSchema);

export default MembershipRequest;
