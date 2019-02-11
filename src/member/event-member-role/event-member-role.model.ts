import { Document, model, Schema } from 'mongoose';

export enum RoleType {
  ORGANISER = 'ORGANISER',
  PARTICIPANT = 'PARTICIPANT',
}

export interface IEventMemberRole {
  type: RoleType;
  abilityToRandom?: boolean;
  matchedMemberId?: string;
}

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
