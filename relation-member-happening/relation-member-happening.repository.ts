import {IRelationMemberHappening} from './relation-member-happening.model';


export class RelationMemberHappeningRepository {
    list: IRelationMemberHappening[] = [];

    public add(relationMemberHappening: IRelationMemberHappening): IRelationMemberHappening {
        this.list.push(relationMemberHappening);

        return relationMemberHappening
    }

    public get(id: string): IRelationMemberHappening {
        // @ts-ignore
        return this.list.find((el) => el.id === id)
    }
}
