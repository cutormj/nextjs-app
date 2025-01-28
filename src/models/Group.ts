import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IGroup extends Document {
  userId: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema<IGroup> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
