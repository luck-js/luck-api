import { RoleType } from './event-member-role.model';

export class EventMemberRole {
    type: RoleType;
    matchedMemberId: string;
    abilityToRandom: boolean;

    public get MatchedMemberId(): string {
        return this.matchedMemberId;
    }

    public set MatchedMemberId(id: string) {
        this.matchedMemberId = id;
    }
}
