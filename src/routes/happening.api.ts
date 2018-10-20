import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';

export class HappeningApi {
    constructor(private relationMemberHappeningService: RelationMemberHappeningService) {}

    public create() {
        return this.relationMemberHappeningService.createOwnerRelationOfHappening();
    }

    public edit(id: string, option) {
        return this.relationMemberHappeningService.editHappening(id, option);
    }

    public publish(id: string) {
        return this.relationMemberHappeningService.publish(id);
    }

    public addParticipant(id: string, name: string) {
        return this.relationMemberHappeningService.addParticipant(id, name);
    }

    public getDetailedParticipantListInformation(id: string) {
        return this.relationMemberHappeningService.getDetailedParticipantListInformation(id);
    }
}
