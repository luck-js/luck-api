import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Participant implements EventMemberRole {
    type: RoleType;
    public matchedMemberId: string;
}
