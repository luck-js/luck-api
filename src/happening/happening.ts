import { forkJoin, Observable } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { MatchingMemberService } from '../services/matching-member.service';
import { MemberFactory } from '../member/member.factory';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';

export class Happening implements IHappening {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public isPublish: boolean = false,
    public memberIds: string[] = [],
    private memberRepository: MemberRepository,
    private matchingMemberService: MatchingMemberService,
    private memberFactory: MemberFactory,
  ) {}

  public createMember(type: RoleType, name: string = ''): Observable<Member> {
    if (this.isPublish) {
      throw new Error('Happening is publishing');
    }

    const createdMember = this.memberFactory.create(type, name);
    return this.memberRepository.add(createdMember).pipe(
      tap(member => this.memberIds.push(member.id)),
      mapTo(createdMember),
    );
  }

  public getMember(id: string): Observable<Member> {
    return this.memberRepository
      .getByIndex(id)
      .pipe(map(member => this.memberFactory.recreate(member)));
  }

  public getMembers(): Observable<Member[]> {
    return forkJoin(
      this.memberIds.map(id =>
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
    this.getMembers()
      .pipe(
        map(members => this.matchingMemberService.matchMembers(members)),
        switchMap(members => this.memberRepository.updateList(members)),
      )
      .subscribe();
  }
}
