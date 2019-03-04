import { injectable } from 'inversify';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MemberParticipationRepository } from './member-participation.repository';
import { IMemberParticipationView } from './member-participation-view.model';
import { IMatchedParticipationData, IMemberView } from './member-view.model';
import { MemberParticipationFactory } from './member-participation.factory';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { INewHappeningView } from './happening-view.model';
import { ICreatedHappening, IParticipantUniqueLinkData } from './created-happening-view';

@injectable()
export class MemberParticipationService {
  constructor(
    private memberParticipationRepository: MemberParticipationRepository,
    private memberParticipationFactory: MemberParticipationFactory,
  ) {}

  public createMemberParticipation(): Observable<string> {
    return this.memberParticipationFactory.create().pipe(
      switchMap(memberParticipation => this.memberParticipationRepository.add(memberParticipation)),
      map(memberParticipation => memberParticipation.id),
    );
  }

  public editHappening(id: string, option): Observable<Happening> {
    const { name, description } = option;

    return this.memberParticipationRepository
      .getByIndex(id)
      .pipe(
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

  public publish(id: string): Observable<any> {
    return this.memberParticipationRepository
      .getByIndex(id)
      .pipe(map(memberParticipation => memberParticipation.publishHappening()));
  }

  public addParticipant(id: string, name: string): Observable<Member> {
    return this.memberParticipationRepository
      .getByIndex(id)
      .pipe(
        switchMap(memberParticipation =>
          memberParticipation.createMember(RoleType.PARTICIPANT, name),
        ),
      );
  }

  public getDataView(id: string): Observable<IMemberParticipationView> {
    return this.memberParticipationRepository.getByIndex(id).pipe(
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

  public getDetailedParticipantListInformation(
    id: string,
  ): Observable<IParticipantUniqueLinkData[]> {
    return this.memberParticipationRepository
      .getByIndex(id)
      .pipe(
        switchMap(memberParticipation =>
          memberParticipation
            .getMembers()
            .pipe(
              map(members =>
                this.mapMembersToParticipantUniqueLinkDataList(members, memberParticipation.id),
              ),
            ),
        ),
      );
  }

  public getMatchedMember(id: string): Observable<IMatchedParticipationData> {
    return this.memberParticipationRepository.getByIndex(id).pipe(
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

  public getGenerateDetailedParticipantListInformation(id: string): Observable<ICreatedHappening> {
    return this.memberParticipationRepository.getByIndex(id).pipe(
      switchMap(memberParticipation =>
        memberParticipation.getHappening().pipe(
          switchMap(happening =>
            memberParticipation.getMembers().pipe(
              map(members =>
                this.mapMembersToParticipantUniqueLinkDataList(members, memberParticipation.id),
              ),
              map(participantList => {
                return {
                  participantList,
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

  public generateDetailedParticipantListInformation(
    id: string,
    newHappeningView: INewHappeningView,
  ): Observable<ICreatedHappening> {
    const { participantList, name, description } = newHappeningView;
    return this.memberParticipationRepository.getByIndex(id).pipe(
      switchMap(memberParticipation =>
        forkJoin(
          participantList.map(({ name }) =>
            memberParticipation.createMember(RoleType.PARTICIPANT, name),
          ),
        ).pipe(
          // TODO: create transaction for above operations
          switchMap(() => memberParticipation.publishHappening()),
          switchMap(happening =>
            memberParticipation.updateHappening({ ...happening, ...{ name, description } }),
          ),
          switchMap(() => memberParticipation.getMembers()),
          map(members =>
            this.mapMembersToParticipantUniqueLinkDataList(members, memberParticipation.id),
          ),
          map(participantList => ({
            participantList,
            name: name,
            description: description,
          })),
        ),
      ),
    );
  }

  private mapMembersToParticipantUniqueLinkDataList(
    members: Member[],
    id: string,
  ): IParticipantUniqueLinkData[] {
    return members
      .filter(member => member.eventMemberRole.type !== RoleType.ORGANISER)
      .map(member => this.mapToIParticipantUniqueLinkData(member, id));
  }

  private mapToIParticipantUniqueLinkData(
    { name }: Member,
    id: string,
  ): IParticipantUniqueLinkData {
    const uniqueLink = this.mapToUniqueLink(id);
    return { name, uniqueLink };
  }

  private mapToUniqueLink(id: string): string {
    return id;
  }

  private mapToMemberView({ id, name }: Member): IMemberView {
    return { id, name };
  }
}
