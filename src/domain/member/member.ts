import { IMember } from './member.model';
import { EventMemberRole } from './event-member-role/event-member-role';

export class Member implements IMember {
  constructor(public id: string, public name: string, public eventMemberRole: EventMemberRole) {}

  get MatchedMemberId(): string {
    return this.eventMemberRole.MatchedMemberId;
  }

  set MatchedMemberId(id: string) {
    this.eventMemberRole.MatchedMemberId = id;
  }
}
