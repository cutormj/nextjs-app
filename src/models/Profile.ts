import mongoose, { Document, Schema, Model } from 'mongoose';

interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    website: String,
    location: String,
  },
  { timestamps: true }
);

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
