import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';

@injectable()
export class RelationMemberHappeningFactory {
    constructor(
        @inject(IDENTIFIER.DIFactoryRelationMemberHappening)
        private DIFactoryRelationMemberHappening: (option: IRelationMemberHappening) => RelationMemberHappening) {
    }

    public create(option: IRelationMemberHappening): RelationMemberHappening {
        return this.recreate(option)
    }

    public recreate(option: IRelationMemberHappening): RelationMemberHappening {
        return this.DIFactoryRelationMemberHappening(option)
    }
}
