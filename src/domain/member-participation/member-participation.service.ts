import { injectable } from 'inversify';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
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

  create(): Observable<MemberParticipation> {
    const happening = this.happeningFactory.create();
    const member = happening.addMember(this.memberFactory.create(RoleType.ORGANISER));
    const memberParticipation = this.memberParticipationFactory.create(member, happening);

    return this.happeningService
      .add(memberParticipation.happening)
      .pipe(switchMap(() => this.add(memberParticipation)));
  }

  add(memberParticipation: MemberParticipation): Observable<MemberParticipation> {
    return this.memberParticipationRepository
      .add(mapToEntity(memberParticipation))
      .pipe(mapTo(memberParticipation));
  }

  update(memberParticipation: MemberParticipation): Observable<MemberParticipation> {
    return this.memberParticipationRepository
      .update(mapToEntity(memberParticipation))
      .pipe(mapTo(memberParticipation));
  }

  get(id: string): Observable<MemberParticipation> {
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

  getListByHappeningId(id: string): Observable<MemberParticipation[]> {
    return this.memberParticipationRepository.getByIndex(id).pipe(
      switchMap(memberParticipation =>
        this.memberParticipationRepository.getByHappeningIndex(memberParticipation.happeningId),
      ),
      switchMap(memberParticipations =>
        forkJoin(memberParticipations.map(memberParticipation => this.get(memberParticipation.id))),
      ),
    );
  }

  updateHappeningMetadata(
    id: string,
    happeningMetadata: IHappeningMetadata,
  ): Observable<MemberParticipation> {
    return this.get(id).pipe(
      switchMap(memberParticipation => {
        memberParticipation.updateHappeningMetadata(happeningMetadata);
        return this.happeningService
          .update(memberParticipation.happening)
          .pipe(mapTo(memberParticipation));
      }),
    );
  }

  publishHappening(id: string): Observable<void> {
    const matchMember = (members: Member[]) => {
      return this.matchingMemberService.matchMembers(members);
    };

    return this.get(id).pipe(
      switchMap(memberParticipation => {
        memberParticipation.updateMembers(matchMember(memberParticipation.happening.getMembers()));
        memberParticipation.publishHappening();
        return this.happeningService.update(memberParticipation.happening);
      }),
      mapTo(null),
    );
  }

  addParticipantMember(id: string, name: string): Observable<Member> {
    const createMemberParticipation = happening => {
      const participantMember = happening.addMember(
        this.memberFactory.create(RoleType.PARTICIPANT, name),
      );

      return this.memberParticipationFactory.create(participantMember, happening);
    };

    return this.get(id).pipe(
      switchMap(memberParticipation => {
        const newMemberParticipation = createMemberParticipation(memberParticipation.happening);
        return this.happeningService
          .update(memberParticipation.happening)
          .pipe(mapTo(newMemberParticipation));
      }),
      switchMap(memberParticipation => this.add(memberParticipation)),
      map(memberParticipation => memberParticipation.getMember()),
    );
  }

  addParticipantMembers(id: string, participants: { name: string }[]): Observable<Member[]> {
    const createMemberParticipation = (happening, name) => {
      const participantMember = happening.addMember(
        this.memberFactory.create(RoleType.PARTICIPANT, name),
      );

      return this.memberParticipationFactory.create(participantMember, happening);
    };

    return this.get(id).pipe(
      switchMap(memberParticipation => {
        const memberParticipations = participants.map(({ name }) =>
          createMemberParticipation(memberParticipation.happening, name),
        );
        return this.happeningService
          .update(memberParticipation.happening)
          .pipe(mapTo(memberParticipations));
      }),
      switchMap(memberParticipations =>
        forkJoin(memberParticipations.map(memberParticipation => this.add(memberParticipation))),
      ),
      map(memberParticipations => memberParticipations[0].getMembers()),
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
