import { EventMemberRole } from '../event-member-role';
import { RoleType } from '../event-member-role.model';

export class Organiser implements EventMemberRole {
    type = RoleType.ORGANISER;

    constructor(public abilityToRandom: boolean = false,
                public matchedMemberId: string = null) {

    }

    public get MatchedMemberId(): string {
        if (!this.abilityToRandom) {
            throw new Error('Organiser isn\'t ability to random')
        } else {
            return this.matchedMemberId;
        }

    }

    public set MatchedMemberId(id: string) {
        throw new Error('Organiser does not take part in the matching yet')
    }
}
