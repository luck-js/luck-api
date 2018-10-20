import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';

export class ParticipationHappeningApi {
    constructor(private relationMemberHappeningService: RelationMemberHappeningService) {}

    public getDataView(id: string) {
        return this.relationMemberHappeningService.getDataView(id);
    }

    public getMatchedMember(id: string) {
        return this.relationMemberHappeningService.getMatchedMember(id);
    }
}
