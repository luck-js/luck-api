import { injectable } from 'inversify';
import { IMember } from './member.model';
import { Member } from './member';
import { UuidGenerationService } from './uuid-generation.service';
import { RoleType } from './event-member-role/event-member-role.model';
import { EventMemberRoleFactory } from './event-member-role/event-member-role.factory';

@injectable()
export class MemberFactory {
  constructor(
    private uuidGenerationService: UuidGenerationService,
    private eventMemberRoleFactory: EventMemberRoleFactory,
  ) {}

  create(type: RoleType, name: string = ''): Member {
    const id = this.uuidGenerationService.createNewUuid();
    const eventMemberRole = this.eventMemberRoleFactory.create(type);

    return new Member(id, name, eventMemberRole);
  }

  recreate(member: IMember): Member {
    const { id, name } = member;
    const eventMemberRole = this.eventMemberRoleFactory.recreate(member.eventMemberRole);

    return new Member(id, name, eventMemberRole);
  }
}
