import { Document, model, Schema } from 'mongoose';
import { Member } from './member.interface';

interface MemberDocument extends Member, Document {
  id: string;
}

const MemberSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },
  { collection: 'member' },
);

const MemberModel = model<MemberDocument>('Member', MemberSchema);

export default MemberModel;
