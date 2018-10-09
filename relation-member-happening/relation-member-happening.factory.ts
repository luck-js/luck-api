import {IRelationMemberHappening} from './relation-member-happening.model';

export class RelationMemberHappeningFactory {
    constructor() {
    }

    create(id: string, memberId: string, happeningId: string): IRelationMemberHappening {

        return {
            id,
            memberId,
            happeningId,
        }
    }
}
