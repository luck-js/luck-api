import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Organiser implements EventMemberRole {
    type = RoleType.ORGANISER;
    abilityToRandom = false;
    matchedMemberId: string;

    public get MatchedMemberId(): string {
        throw new Error('Organiser does not take part in the matching yet')
    }

    public set MatchedMemberId(id: string) {
        throw new Error('Organiser does not take part in the matching yet')
    }
}
