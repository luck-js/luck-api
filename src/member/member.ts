import { IMember } from './member.model';
import { EventMemberRole } from './event-member-role/event-member-role';

export class Member implements IMember {

    constructor(
        public id: string,
        public relationId: string,
        public name: string,
        public uniqueLink: string,
        public eventMemberRole: EventMemberRole
    ) {

    }
}
