import {injectable} from 'inversify';
import {IMember} from './member.model';

@injectable()
export class MemberRepository {
    list: IMember[];

    constructor(memberList: IMember[] = []) {
        this.list = memberList;
    }

    public add(member: IMember): IMember {
        this.list.push(member);

        return member
    }

    public getByIndex(id: string) :IMember {
        return this.list.find((el) => el.id === id)
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