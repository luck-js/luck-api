import { Document, model, Schema } from 'mongoose';
import {
  IEventMemberRole,
  RoleType,
} from '../../domain/member/event-member-role/event-member-role.model';

export interface IEventMemberRoleSchema extends IEventMemberRole, Document {}

export const EventMemberRoleSchema: Schema = new Schema({
  type: {
    type: RoleType,
    required: true,
  },
  abilityToRandom: {
    type: Boolean,
    required: true,
  },
  matchedMemberId: {
    type: String,
    required: false,
  },
});

export default model<IEventMemberRoleSchema>('EventMemberRole', EventMemberRoleSchema);
