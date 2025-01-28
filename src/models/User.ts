import mongoose, { Document, Model, Schema } from 'mongoose';

interface IProfile {
  bio: string;
}

interface ILink {
  url: string;
  shortDescription: string;
  images: string[];
  groupId: mongoose.Schema.Types.ObjectId;
}

interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  image?: string;
  role: 'user' | 'admin';
  profile: IProfile;
  links: ILink[];
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
  url: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
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
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
