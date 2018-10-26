import { Document, Schema, model } from 'mongoose';
import { EventMemberRoleSchema } from './event-member-role/event-member-role.model';
import { EventMemberRole } from './event-member-role/event-member-role';

export interface IMember {
    id: string,
    relationId: string,
    name: string,
    eventMemberRole: EventMemberRole
}

export interface IMemberSchema extends IMember, Document {
    id: string,
}

const MemberSchema: Schema = new Schema({
    id: {
        type: String,
        required: true
    },
    relationId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    eventMemberRole: EventMemberRoleSchema
}, { collection: 'member' });

export default model<IMemberSchema>('Member', MemberSchema);
