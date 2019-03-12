import { injectable } from 'inversify';
import { MemberFactory } from './member.factory';
import { Member } from './member';
import { forkJoin, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { IMember } from './member.model';
import { RoleType } from './event-member-role/event-member-role.model';
import { IMemberRepository } from './member.repository';

@injectable()
export class MemberService {
  constructor(private memberRepository: IMemberRepository, private memberFactory: MemberFactory) {}

  create(type: RoleType, name: string = ''): Member {
    return this.memberFactory.create(type, name);
  }

  addList(members: Member[]): Observable<Member[]> {
    return this.memberRepository.addList(mapToEntity(members)).pipe(mapTo(members));
    // .pipe(map(members => members.map(member => this.memberFactory.recreate(member))));
  }

  updateList(members: Member[]): Observable<Member[]> {
    return this.memberRepository
      .updateList(mapToEntity(members))
      .pipe(map(members => members.map(member => this.memberFactory.recreate(member))));
  }

  get(id: string): Observable<Member> {
    return this.memberRepository
      .getByIndex(id)
      .pipe(map(member => this.memberFactory.recreate(member)));
  }

  getList(memberIds: string[]): Observable<Member[]> {
    return forkJoin(
      memberIds.map(id =>
        this.memberRepository
          .getByIndex(id)
          .pipe(map(member => this.memberFactory.recreate(member))),
      ),
    );
  }
}

function mapToEntity(members: Member[]): IMember[] {
  return members.map(({ id, name, eventMemberRole }) => ({ id, name, eventMemberRole }));
}
