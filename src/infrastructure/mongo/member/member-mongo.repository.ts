import { injectable } from 'inversify';
import { Observable, from, forkJoin } from 'rxjs';
import MemberModel from './member.schema';
import { IMemberRepository } from '../../../domain/member/member.repository';
import { IMember } from '../../../domain/member/member.model';

@injectable()
export class MemberMongoRepository implements IMemberRepository {
  add({ id, name, eventMemberRole }: IMember): Observable<IMember> {
    return from(new MemberModel({ id, name, eventMemberRole }).save());
  }

  addList(members: IMember[]): Observable<IMember[]> {
    return forkJoin(members.map(el => this.add(el)));
  }

  getByIndex(id: string): Observable<IMember> {
    return from(MemberModel.findOne({ id }, null, { limit: 1 }).exec());
  }

  updateList(members: IMember[]): Observable<IMember[]> {
    return forkJoin(members.map(el => this.update(el)));
  }

  private update(member: IMember): Observable<IMember> {
    return from(
      MemberModel.findOneAndUpdate({ id: member.id }, member, { upsert: true, new: true }).exec(),
    );
  }
}
