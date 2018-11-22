import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import RelationMemberHappeningModel, { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';

@injectable()
export class RelationMemberHappeningRepository {

    constructor(private list: IRelationMemberHappening[] = [],
                private relationMemberHappeningFactory: RelationMemberHappeningFactory) {

    }

    public add(relationMemberHappening: IRelationMemberHappening): Observable<IRelationMemberHappening> {
        return from(new RelationMemberHappeningModel(relationMemberHappening).save());
    }

    public getByIndex(id: string): Observable<RelationMemberHappening> {
        return from(RelationMemberHappeningModel.findOne({ id }, null, { limit: 1 }).exec()).pipe(
            map((relationMemberHappening) => this.relationMemberHappeningFactory.recreate(relationMemberHappening))
        )
    }
}
