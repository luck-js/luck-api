import { Document, model, Schema } from 'mongoose';
import { MemberRecord } from './member.interface';

interface MemberDocument extends MemberRecord, Document {
  id: string;
}

const MemberSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    matchedMemberId: {
      type: String,
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
