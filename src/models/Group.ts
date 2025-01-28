import mongoose, { Schema, Document, Model } from 'mongoose';

interface IGroup extends Document {
  name: string;
}

const GroupSchema: Schema<IGroup> = new Schema({
  name: { type: String, required: true },
});

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
