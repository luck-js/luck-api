import { RoleType } from './event-member-role.model';

export abstract class EventMemberRole {
    public type: RoleType;

    protected constructor(public abilityToRandom: boolean,
                          public matchedMemberId: string) {
    }

    public get MatchedMemberId(): string {
        return this.matchedMemberId;
    }

    public set MatchedMemberId(id: string) {
        this.matchedMemberId = id;
    }
}
