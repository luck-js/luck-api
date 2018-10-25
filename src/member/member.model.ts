import { Document, Schema, model } from 'mongoose';
import { EventMemberRoleSchema, IEventMemberRole } from './event-member-role/event-member-role.model';

export interface IMember {
    id: string,
    relationId: string,
    name: string,
    eventMemberRole: IEventMemberRole
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
