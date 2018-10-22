import { injectable } from 'inversify';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';

@injectable()
export class RelationMemberHappeningRepository {

    constructor(private list: IRelationMemberHappening[] = [],
                private relationMemberHappeningFactory: RelationMemberHappeningFactory) {

    }

    public add(relationMemberHappening: IRelationMemberHappening): IRelationMemberHappening {
        this.list.push(relationMemberHappening);

        return relationMemberHappening
    }

    public get(id: string): RelationMemberHappening {
        const relationMemberHappening = this.list.find((el) => el.id === id);

        if (!relationMemberHappening) {
            throw Error('id isn\' correct')
        } else {
            return this.relationMemberHappeningFactory.recreate(relationMemberHappening);
        }
    }
}
