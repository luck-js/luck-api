import { Document, model, Schema } from 'mongoose';
import { EventMemberRoleSchema } from './event-member-role.schema';
import { IMember } from '../../domain/member/member.model';

export interface IMemberSchema extends IMember, Document {
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
    eventMemberRole: EventMemberRoleSchema,
  },
  { collection: 'member' },
);

export default model<IMemberSchema>('Member', MemberSchema);
