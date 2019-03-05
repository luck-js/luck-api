import { injectable } from 'inversify';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MemberParticipationRepository } from './member-participation.repository';
import { IMemberParticipationView } from './member-participation-view.model';
import { IMatchedMemberView, IMemberView } from './member-view.model';
import { MemberParticipationFactory } from './member-participation.factory';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { INewHappeningView } from './happening-view.model';
import { ICreatedHappeningView, IParticipantsView } from './created-happening-view.model';
import { MemberParticipation } from './member-participation';
import { IHappening } from '../happening/happening.model';

@injectable()
export class MemberParticipationService {
  constructor(
    private memberParticipationRepository: MemberParticipationRepository,
    private memberParticipationFactory: MemberParticipationFactory,
  ) {}

  public createMemberParticipation(): Observable<string> {
    return this.memberParticipationFactory.create().pipe(
      switchMap(memberParticipation => this.memberParticipationRepository.add(memberParticipation)),
      // TODO: refactor to return memberParticipation
      map(memberParticipation => memberParticipation.id),
    );
  }

  public editHappening(id: string, option: IHappening): Observable<Happening> {
    const { name, description } = option;

    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation
          .getHappening()
          .pipe(
            switchMap(happening =>
              memberParticipation.updateHappening({ ...happening, ...{ name, description } }),
            ),
          ),
      ),
    );
  }

  public publishHappening(id: string): Observable<any> {
    return this.getMemberParticipation(id).pipe(
      map(memberParticipation => memberParticipation.publishHappening()),
    );
  }

  public addParticipantMember(id: string, name: string): Observable<Member> {
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation.createMember(RoleType.PARTICIPANT, name),
      ),
    );
  }

  public getMemberParticipationView(id: string): Observable<IMemberParticipationView> {
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation.getHappening().pipe(
          switchMap(happening =>
            memberParticipation.getMember().pipe(
              map(member => this.mapToMemberView(member)),
              map(member => ({ happening, member })),
            ),
          ),
        ),
      ),
    );
  }

  public getParticipantsView(id: string): Observable<IParticipantsView[]> {
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation
          .getMembers()
          .pipe(map(members => this.mapMembersToParticipantsView(members, memberParticipation.id))),
      ),
    );
  }

  public getMatchedMember(id: string): Observable<IMatchedMemberView> {
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation.getMember().pipe(
          switchMap(member =>
            memberParticipation.getMatchedMember().pipe(
              map(matchedMember => {
                return {
                  me: this.mapToMemberView(member),
                  matchedMember: this.mapToMemberView(matchedMember),
                };
              }),
            ),
          ),
        ),
      ),
    );
  }

  public getGeneratedParticipantUniqueLinks(id: string): Observable<ICreatedHappeningView> {
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation.getHappening().pipe(
          switchMap(happening =>
            memberParticipation.getMembers().pipe(
              map(members => this.mapMembersToParticipantsView(members, memberParticipation.id)),
              map(participants => {
                return {
                  participants,
                  name: happening.name,
                  description: happening.description,
                };
              }),
            ),
          ),
        ),
      ),
    );
  }

  public generateParticipantUniqueLinks(
    id: string,
    newHappeningView: INewHappeningView,
  ): Observable<ICreatedHappeningView> {
    const { participants, name, description } = newHappeningView;
    return this.getMemberParticipation(id).pipe(
      switchMap(memberParticipation =>
        forkJoin(
          participants.map(({ name }) =>
            memberParticipation.createMember(RoleType.PARTICIPANT, name),
          ),
        ).pipe(
          // TODO: create transaction for above operations
          switchMap(() => memberParticipation.publishHappening()),
          switchMap(happening =>
            memberParticipation.updateHappening({ ...happening, ...{ name, description } }),
          ),
          switchMap(() => memberParticipation.getMembers()),
          map(members => this.mapMembersToParticipantsView(members, memberParticipation.id)),
          map(participants => ({
            participants,
            name: name,
            description: description,
          })),
        ),
      ),
    );
  }

  private mapMembersToParticipantsView(members: Member[], id: string): IParticipantsView[] {
    return members
      .filter(member => member.eventMemberRole.type !== RoleType.ORGANISER)
      .map(member => ({
        name: member.name,
        uniqueLink: this.mapToUniqueLink(id),
      }));
  }

  private mapToUniqueLink(id: string): string {
    return id;
  }

  private mapToMemberView({ id, name }: Member): IMemberView {
    return { id, name };
  }

  private getMemberParticipation(id: string): Observable<MemberParticipation> {
    return this.memberParticipationRepository
      .getByIndex(id)
      .pipe(
        map(memberParticipation => this.memberParticipationFactory.recreate(memberParticipation)),
      );
  }
}
