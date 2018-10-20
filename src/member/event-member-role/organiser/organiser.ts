import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Organiser implements EventMemberRole {
    type = RoleType.ORGANISER;
    matchedMemberId: string;
}
