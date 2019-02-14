import { injectable } from 'inversify';
import { Observable, from, forkJoin } from 'rxjs';
import MemberModel, { IMember } from './member.model';

@injectable()
export class MemberRepository {
  public add({ id, name, eventMemberRole }: IMember): Observable<IMember> {
    return from(new MemberModel({ id, name, eventMemberRole }).save());
  }

  public getByIndex(id: string): Observable<IMember> {
    return from(MemberModel.findOne({ id }, null, { limit: 1 }).exec());
  }

  public updateList(memberList: IMember[]): Observable<IMember[]> {
    return forkJoin(memberList.map(el => this.updateMember(el)));
  }

  private updateMember(member): Observable<IMember> {
    return from(MemberModel.findOneAndUpdate({ id: member.id }, member, { new: true }).exec());
  }
}
