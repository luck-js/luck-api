import { injectable } from 'inversify';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { MemberParticipationFactory } from './member-participation.factory';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { MemberParticipation } from './member-participation';
import { IHappeningMetadata } from '../happening/happening.model';
import { HappeningService } from '../happening/happening.service';
import { IMemberParticipation } from './member-participation.model';
import { MemberFactory } from '../member/member.factory';
import { HappeningFactory } from '../happening/happening.factory';
import { MatchingMemberService } from '../matching-member.service';
import { IMemberParticipationRepository } from './member-participation.repository';

@injectable()
export class MemberParticipationService {
  constructor(
    private happeningService: HappeningService,
    private matchingMemberService: MatchingMemberService,
    private memberFactory: MemberFactory,
    private happeningFactory: HappeningFactory,
    private memberParticipationRepository: IMemberParticipationRepository,
    private memberParticipationFactory: MemberParticipationFactory,
  ) {}

  public create(): Observable<MemberParticipation> {
    const happening = this.happeningFactory.create();
    const member = happening.addMember(this.memberFactory.create(RoleType.ORGANISER));
    const memberParticipation = this.memberParticipationFactory.create(member, happening);

    return this.add(memberParticipation);
  }

  public add(memberParticipation: MemberParticipation): Observable<MemberParticipation> {
    return this.happeningService.add(memberParticipation.happening).pipe(
      switchMap(() => this.memberParticipationRepository.add(mapToEntity(memberParticipation))),
      mapTo(memberParticipation),
      // map(memberParticipation => this.memberParticipationFactory.recreate(memberParticipation)),
    );
  }

  public update(memberParticipation: MemberParticipation): Observable<MemberParticipation> {
    return this.happeningService.update(memberParticipation.happening).pipe(
      // switchMap(() => this.memberParticipationRepository.update(mapToEntity(memberParticipation))),
      mapTo(memberParticipation),
      // map(memberParticipation => this.memberParticipationFactory.recreate(memberParticipation)),
    );
  }

  public get(id: string): Observable<MemberParticipation> {
    const memberParticipation$ = this.memberParticipationRepository.getByIndex(id);
    const happening$ = memberParticipation$.pipe(
      switchMap(memberParticipation => this.happeningService.get(memberParticipation.happeningId)),
    );

    const recreateMemberParticipation = (memberParticipation, happening) => {
      const id = memberParticipation.id;
      const member = happening.getMember(memberParticipation.memberId);
      return this.memberParticipationFactory.recreate(id, member, happening);
    };

    return combineLatest([memberParticipation$, happening$]).pipe(
      map(([memberParticipation, happening]) =>
        recreateMemberParticipation(memberParticipation, happening),
      ),
    );
  }

  public updateHappeningMetadata(
    id: string,
    happeningMetadata: IHappeningMetadata,
  ): Observable<MemberParticipation> {
    return this.get(id).pipe(
      switchMap(memberParticipation => {
        memberParticipation.updateHappeningMetadata(happeningMetadata);
        return this.update(memberParticipation);
      }),
    );
  }

  public publishHappening(id: string): Observable<void> {
    const matchMember = (members: Member[]) => {
      return this.matchingMemberService.matchMembers(members);
    };

    return this.get(id).pipe(
      filter(memberParticipation => !memberParticipation.happening.isPublish),
      switchMap(memberParticipation => {
        memberParticipation.publishHappening();
        memberParticipation.updateMembers(matchMember(memberParticipation.happening.getMembers()));
        return this.update(memberParticipation);
      }),
      mapTo(null),
    );
  }

  public addParticipantMember(id: string, name: string): Observable<Member> {
    return this.get(id).pipe(
      switchMap(memberParticipation => {
        const participantMember = memberParticipation.happening.addMember(
          this.memberFactory.create(RoleType.PARTICIPANT, name),
        );
        return this.update(memberParticipation).pipe(mapTo(participantMember));
      }),
    );
  }

  public addParticipantMembers(id: string, participants: { name: string }[]): Observable<Member[]> {
    return this.get(id).pipe(
      switchMap(memberParticipation => {
        const participantMember = participants.map(({ name }) => {
          return memberParticipation.happening.addMember(
            this.memberFactory.create(RoleType.PARTICIPANT, name),
          );
        });
        return this.update(memberParticipation).pipe(mapTo(participantMember));
      }),
    );
  }
}

function mapToEntity({ id, member, happening }: MemberParticipation): IMemberParticipation {
  return {
    id,
    memberId: member.id,
    happeningId: happening.id,
  };
}
