import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { HappeningRepository } from '../happening/happening.repository';
import { MemberRepository } from '../member/member.repository';
import { Member } from '../member/member';
import { Happening } from '../happening/happening';
import { IMemberParticipation } from './member-participation.model';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { HappeningFactory } from '../happening/happening.factory';
import { IHappening } from '../happening/happening.model';
import { RoleType } from '../member/event-member-role/event-member-role.model';

@injectable()
export class MemberParticipation implements IMemberParticipation {
  constructor(
    public id: string,
    public memberId: string,
    public happeningId: string,
    private memberRepository: MemberRepository,
    private happeningRepository: HappeningRepository,
    private happeningFactory: HappeningFactory,
  ) {}

  public get Id() {
    return this.id;
  }

  public getMember(): Observable<Member> {
    return of(null);
  }

  public getMembers(): Observable<Member[]> {
    return this.getHappening().pipe(switchMap(happening => happening.getMembers()));
  }

  public createMember(roleType: RoleType, name: string): Observable<Member> {
    return this.getHappening().pipe(
      switchMap(happening =>
        happening
          .createMember(roleType, name)
          .pipe(switchMap(member => this.updateHappening(happening).pipe(mapTo(member)))),
      ),
    );
  }

  public getHappening(): Observable<Happening> {
    return this.happeningRepository
      .getByIndex(this.happeningId)
      .pipe(map(happening => this.happeningFactory.recreate(happening)));
  }

  public updateHappening(happening: IHappening): Observable<Happening> {
    return this.happeningRepository
      .update(happening.id, happening)
      .pipe(map(happening => this.happeningFactory.recreate(happening)));
  }

  public publishHappening(): Observable<Happening> {
    return this.getHappening().pipe(
      tap(happening => happening.publishEvent()),
      switchMap(happening => this.updateHappening(happening)),
    );
  }
}
