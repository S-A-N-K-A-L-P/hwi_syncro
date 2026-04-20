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
  tagline: string;
  problemStatement: string;
  solutionOverview: string;
  industry: string;
  businessModel: "SaaS" | "Marketplace" | "D2C" | "B2B" | "Service" | "Other";
  status: "ideation" | "prototype" | "early_users" | "revenue" | "expanding" | "mvp" | "scaling" | "launched";
  registrationType: "pvt_ltd" | "llp" | "sole_proprietorship" | "unregistered";
  equityOffering: string;
  kpis: {
    users: number;
    revenue: number;
    growth: number;
  };
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
    tagline: {
      type: String,
      trim: true,
      default: "",
    },
    problemStatement: {
      type: String,
      default: "",
    },
    solutionOverview: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      default: "Other",
    },
    businessModel: {
      type: String,
      enum: ["SaaS", "Marketplace", "D2C", "B2B", "Service", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["ideation", "prototype", "early_users", "revenue", "expanding", "mvp", "scaling", "launched"],
      default: "ideation",
    },
    registrationType: {
      type: String,
      enum: ["pvt_ltd", "llp", "sole_proprietorship", "unregistered"],
      default: "unregistered",
    },
    equityOffering: {
      type: String,
      default: "0%",
    },
    kpis: {
      users: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
      growth: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true,
  }
);

const Startup = models.Startup || model<IStartup>("Startup", StartupSchema);

export default Startup;
