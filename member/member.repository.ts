import {IMember} from './member.model';

export class MemberRepository {
    list:IMember[];

    constructor(memberList:IMember[]){
        this.list = memberList;
    }

    public add(id: string, name: string): IMember {
        return null
    }

    public getList(): IMember[] {
        return [...this.list];
    }
    public updateList(memberList: IMember[]){
        this.list = memberList;
    }

    public updateMatchedMemberId(id: string, idMatched: string,) {

    }
}