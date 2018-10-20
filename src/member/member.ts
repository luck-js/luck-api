import { IMember } from './member.model';
import { EventMemberRole } from './event-member-role/event-member-role';
import { RoleType } from './event-member-role/event-member-role.model';

export class Member implements IMember {

    constructor(
        public id: string,
        public relationId: string,
        public name: string,
        public uniqueLink: string,
        public eventMemberRole: EventMemberRole
    ) {

    }

    public getMatchedMemberId(): string {
        if (this.eventMemberRole.type === RoleType.ORGANISER) {
            throw new Error('Organiser does not take part in the matching yet')
        }

        if (this.eventMemberRole.type === RoleType.PARTICIPANT) {
            return this.eventMemberRole.matchedMemberId;
        }
    }
}
