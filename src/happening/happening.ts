import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { MatchingMemberService } from '../services/matching-member.service';
import { MemberFactory } from '../member/member.factory';
import { RelationMemberHappeningFactory } from '../relation-member-happening/relation-member-happening.factory';
import { RelationMemberHappeningRepository } from '../relation-member-happening/relation-member-happening.repository';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';

export class Happening implements IHappening {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public isPublish: boolean = false,
    public memberIdList: string[] = [],
    private memberRepository: MemberRepository,
    private relationMemberHappeningRepository: RelationMemberHappeningRepository,
    private matchingMemberService: MatchingMemberService,
    private relationMemberHappeningFactory: RelationMemberHappeningFactory,
    private memberFactory: MemberFactory,
  ) {}

  public addMember(type: RoleType, name?: string): Observable<Member> {
    if (this.isPublish) {
      throw new Error('Happening is publishing');
    }

    return this.memberRepository.add(this.memberFactory.create(type, name)).pipe(
      tap(member => this.memberIdList.push(member.id)),
      map(member => this.memberFactory.recreate(member)),
    );
  }

  public getMember(id: string): Observable<Member> {
    return this.memberRepository
      .getByIndex(id)
      .pipe(map(member => this.memberFactory.recreate(member)));
  }

  public getMemberList(): Observable<Member[]> {
    return forkJoin(
      this.memberIdList.map(id =>
        this.memberRepository
          .getByIndex(id)
          .pipe(map(member => this.memberFactory.recreate(member))),
      ),
    );
  }

  public publishEvent(): void {
    this.isPublish = true;
    this.matchMember();
  }

  private matchMember(): void {
    this.getMemberList()
      .pipe(
        map(memberList => this.matchingMemberService.matchMemberList(memberList)),
        switchMap(newMemberList => this.memberRepository.updateList(newMemberList)),
      )
      .subscribe();
  }
}
