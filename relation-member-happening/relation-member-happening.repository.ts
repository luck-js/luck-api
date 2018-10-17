import {injectable} from 'inversify';
import {IRelationMemberHappening} from './relation-member-happening.model';

@injectable()
export class RelationMemberHappeningRepository {

    constructor(private list: IRelationMemberHappening[] = []){

    }

    public add(relationMemberHappening: IRelationMemberHappening): IRelationMemberHappening {
        this.list.push(relationMemberHappening);

        return relationMemberHappening
    }

    public get(id: string): IRelationMemberHappening {
        return this.list.find((el) => el.id === id)
    }
}
