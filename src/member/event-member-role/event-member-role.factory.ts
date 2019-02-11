import { injectable } from 'inversify';
import { IEventMemberRole, RoleType } from './event-member-role.model';
import { EventMemberRole } from './event-member-role';
import { Organiser } from './organiser/organiser';
import { Participant } from './participant/participant';

@injectable()
export class EventMemberRoleFactory {
  constructor() {}

  public create(type: RoleType): EventMemberRole {
    return this.switchInstanceHelper(type);
  }

  public recreate({ type, abilityToRandom, matchedMemberId }: IEventMemberRole): EventMemberRole {
    return this.switchInstanceHelper(type, abilityToRandom, matchedMemberId);
  }

  private switchInstanceHelper(type, abilityToRandom?, matchedMemberId?) {
    if (type === RoleType.ORGANISER) {
      return new Organiser(abilityToRandom, matchedMemberId);
    }

    if (type === RoleType.PARTICIPANT) {
      return new Participant(abilityToRandom, matchedMemberId);
    }
  }
}
