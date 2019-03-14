import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Participant extends EventMemberRole {
  type = RoleType.PARTICIPANT;

  constructor(abilityToRandom: boolean = true, matchedMemberId: string = null) {
    super(abilityToRandom, matchedMemberId);
  }
}
