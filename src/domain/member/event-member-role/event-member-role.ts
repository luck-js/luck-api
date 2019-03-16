import { RoleType } from './event-member-role.model';
import { IEventMemberRole } from './event-member-role.model';

export abstract class EventMemberRole implements IEventMemberRole {
  type: RoleType;

  protected constructor(public abilityToRandom: boolean, public matchedMemberId: string) {}

  get MatchedMemberId(): string {
    return this.matchedMemberId;
  }

  set MatchedMemberId(id: string) {
    this.matchedMemberId = id;
  }
}
