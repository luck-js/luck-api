import {IMember} from './member.model';

export class MemberRepository {
    list: IMember[];

    constructor(memberList: IMember[]) {
        this.list = memberList;
    }

    public add(id: string, name: string): IMember {
        return {
            name,
            id: '0',
            matchedMemberId: null,
            uniqueLink: '9ab65cf8-3113-4fe5-bd52-594d0e484464'
        }
    }

    public getList(): IMember[] {
        return this.list;
    }

    public updateList(memberList: IMember[]) {
        this.list = memberList;
    }

    public updateMatchedMemberId(id: string, idMatched: string,) {

    }
}