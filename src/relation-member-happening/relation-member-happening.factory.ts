import {injectable} from 'inversify';
import {IRelationMemberHappening} from './relation-member-happening.model';

@injectable()
export class RelationMemberHappeningFactory {
    constructor() {
    }

    public create(id: string, memberId: string, happeningId: string): IRelationMemberHappening {

        return {
            id,
            memberId,
            happeningId,
        }
    }
}
