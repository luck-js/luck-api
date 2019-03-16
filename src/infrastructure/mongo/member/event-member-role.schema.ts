import { Schema } from 'mongoose';
import { RoleType } from '../../../domain/member/event-member-role/event-member-role.model';

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
