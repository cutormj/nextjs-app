import mongoose, { Document, Model, Schema } from 'mongoose';

interface IProfile {
  bio: string;
}

interface ILink {
  url: string;
  shortDescription: string;
  description: string;
  images: string[];
  groupId: mongoose.Schema.Types.ObjectId;
  top: string;
  left: string;
  hashtags: string[];
}

interface IBranding {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  image?: string;
  hotspotImage: string;
  role: 'user' | 'admin';
  profile: IProfile;
  links: ILink[];
  branding: IBranding;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema({
  bio: {
    type: String,
    required: true,
  },
});

const LinkSchema: Schema<ILink> = new Schema({
  url: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String] },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  top: { type: String, required: true },
  left: { type: String, required: true },
  hashtags: { type: [String], default: [] }, // New field for storing hashtags
});

const BrandingSchema: Schema<IBranding> = new Schema({
  primary: { type: String, default: "#000000" },
  secondary: { type: String, default: "#FFFFFF" },
  accent: { type: String, default: "#EF4444" },
  background: { type: String, default: "#F8FAFC" },
  textPrimary: { type: String, default: "#1F2937" },
  textSecondary: { type: String, default: "#4B5563" },
});

const UserSchema: Schema<IUser> = new Schema(
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hotspotImage: {
      type: String,
      required: false,
    },
    image: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      type: ProfileSchema,
      required: true,
    },
    links: {
      type: [LinkSchema],
    },
    branding: { type: BrandingSchema, default: {} },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
