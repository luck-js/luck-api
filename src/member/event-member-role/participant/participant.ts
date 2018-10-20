import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Participant implements EventMemberRole {
    type = RoleType.PARTICIPANT;
    abilityToRandom = true;
    matchedMemberId: string;

    public get MatchedMemberId(): string {
        return this.matchedMemberId;
    }

    public set MatchedMemberId(id: string) {
        this.matchedMemberId = id;
    }
}
