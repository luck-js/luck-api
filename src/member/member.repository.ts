import { injectable } from 'inversify';
import { Observable, from, merge, of, forkJoin } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import MemberModel, { IMember } from './member.model';
import { Member } from './member';
import { MemberFactory } from './member.factory';

@injectable()
export class MemberRepository {

    constructor(private list: IMember[] = [],
                private memberFactory: MemberFactory) {
    }

    public add({ id, relationId, name, eventMemberRole }: IMember): Observable<IMember> {
        return from(new MemberModel({ id, relationId, name, eventMemberRole }).save());
    }

    public getByIndex(id: string): Observable<Member> {
        return from(MemberModel.findOne({ id }, null, { limit: 1 }).exec()).pipe(
            map((member) => this.memberFactory.recreate(member))
        );
    }

    public getList(): Member[] {
        return this.list.map((member) => this.memberFactory.recreate(member));
    }

    public updateList(memberList: IMember[]): Observable<Member[]> {
        return forkJoin(memberList.map((el) => this.updateMember(el)))
    }

    private updateMember(member): Observable<Member> {
        return from(MemberModel.findOneAndUpdate({ id: member.id }, member, { new: true }).exec()).pipe(
            map((member) => this.memberFactory.recreate(member))
        );
    }
}
