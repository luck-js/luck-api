import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Organiser extends EventMemberRole {
  public type = RoleType.ORGANISER;

  constructor(abilityToRandom: boolean = false, matchedMemberId: string = null) {
    super(abilityToRandom, matchedMemberId);
  }

  public get MatchedMemberId(): string {
    if (!this.abilityToRandom) {
      throw new Error("Organiser isn't ability to random");
    } else {
      return this.matchedMemberId;
    }
  }

  public set MatchedMemberId(id: string) {
    throw new Error('Organiser does not take part in the matching yet');
  }
}
