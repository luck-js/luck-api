import { injectable } from 'inversify';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMatchedParticipationData, IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { IHappeningView, INewHappeningView } from './happening-view.model';
import { ICreatedHappening, IParticipantUniqueLinkData } from './created-happening-view';
import { HappeningRepository } from '../happening/happening.repository';

@injectable()
export class RelationMemberHappeningService {
  constructor(
    private happeningRepository: HappeningRepository,
    private happeningFactory: HappeningFactory,
    private relationMemberHappeningRepository: RelationMemberHappeningRepository,
    private relationMemberHappeningFactory: RelationMemberHappeningFactory,
  ) {}

  public createOwnerRelationOfHappening(): Observable<string> {
    const happening = this.happeningFactory.create();

    return happening.createMember(RoleType.ORGANISER).pipe(
      switchMap(() => this.happeningRepository.add(happening)),
      map(member => this.relationMemberHappeningFactory.create(member.id, happening.id)),
      switchMap(relation => this.relationMemberHappeningRepository.add(relation)),
      map(relation => relation.id),
    );
  }

  public editHappening(relationId: string, option): Observable<Happening> {
    const { name, description } = option;

    return this.getHappeningObservable(relationId).pipe(
      map(happening => Object.assign({}, happening, { name, description })),
      switchMap(editedHappening =>
        this.happeningRepository
          .update(editedHappening.id, editedHappening)
          .pipe(map(happening => this.happeningFactory.recreate(happening))),
      ),
    );
  }

  public publish(relationId: string): Observable<any> {
    return this.relationMemberHappeningRepository
      .getByIndex(relationId)
      .pipe(map(relationMemberHappening => relationMemberHappening.publishHappening()));
  }

  public addParticipant(relationId: string, name: string): Observable<Member> {
    return this.relationMemberHappeningRepository
      .getByIndex(relationId)
      .pipe(
        switchMap(relationMemberHappening =>
          relationMemberHappening.createMember(RoleType.PARTICIPANT, name),
        ),
      );
  }

  public getDataView(id: string): Observable<IParticipationHappeningView> {
    return this.getHappeningObservable(id).pipe(
      map(happening => this.mapToHappeningView(happening)),
      switchMap(happening =>
        this.getMemberObservable(id).pipe(
          map(member => this.mapToMemberView(member)),
          map(member => ({ happening, member })),
        ),
      ),
    );
  }

  public getDetailedParticipantListInformation(
    relationId: string,
  ): Observable<IParticipantUniqueLinkData[]> {
    return this.relationMemberHappeningRepository
      .getByIndex(relationId)
      .pipe(
        switchMap(relationMemberHappening =>
          relationMemberHappening
            .getMembers()
            .pipe(
              map(members =>
                this.mapMembersToParticipantUniqueLinkDataList(members, relationMemberHappening.id),
              ),
            ),
        ),
      );
  }

  public getMatchedMember(idRelation: string): Observable<IMatchedParticipationData> {
    return this.getMemberObservable(idRelation).pipe(
      switchMap(me =>
        this.getHappeningObservable(idRelation).pipe(
          switchMap(happening => happening.getMember(me.MatchedMemberId)),
          map(matchedMember => {
            return {
              me: this.mapToMemberView(me),
              matchedMember: this.mapToMemberView(matchedMember),
            };
          }),
        ),
      ),
    );
  }

  public getGenerateDetailedParticipantListInformation(
    relationId: string,
  ): Observable<ICreatedHappening> {
    return this.relationMemberHappeningRepository.getByIndex(relationId).pipe(
      switchMap(relationMemberHappening =>
        relationMemberHappening.getHappening().pipe(
          switchMap(happening =>
            relationMemberHappening.getMembers().pipe(
              map(members =>
                this.mapMembersToParticipantUniqueLinkDataList(members, relationMemberHappening.id),
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
    relationId: string,
    newHappeningView: INewHappeningView,
  ): Observable<ICreatedHappening> {
    const { participantList, name, description } = newHappeningView;
    return this.relationMemberHappeningRepository.getByIndex(relationId).pipe(
      switchMap(relationMemberHappening =>
        forkJoin(
          participantList.map(({ name }) =>
            relationMemberHappening.createMember(RoleType.PARTICIPANT, name),
          ),
        ).pipe(
          // TODO: create transaction for above operations
          switchMap(() => relationMemberHappening.publishHappening()),
          switchMap(happening =>
            relationMemberHappening.updateHappening({ ...happening, ...{ name, description } }),
          ),
          switchMap(() => relationMemberHappening.getMembers()),
          map(members =>
            this.mapMembersToParticipantUniqueLinkDataList(members, relationMemberHappening.id),
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
    relationId: string,
  ): IParticipantUniqueLinkData[] {
    return members
      .filter(member => member.eventMemberRole.type !== RoleType.ORGANISER)
      .map(member => this.mapToIParticipantUniqueLinkData(member, relationId));
  }

  private getHappeningObservable(relationId): Observable<Happening> {
    return this.relationMemberHappeningRepository
      .getByIndex(relationId)
      .pipe(switchMap(relation => relation.getHappening()));
  }

  private getMemberObservable(relationId): Observable<Member> {
    return this.relationMemberHappeningRepository
      .getByIndex(relationId)
      .pipe(switchMap(relation => relation.getMember()));
  }

  private mapToIParticipantUniqueLinkData(
    { name }: Member,
    relationId: string,
  ): IParticipantUniqueLinkData {
    const uniqueLink = this.mapToUniqueLink(relationId);
    return { name, uniqueLink };
  }

  private mapToUniqueLink(id: string): string {
    return id;
  }

  private mapToMemberView({ id, name }: Member): IMemberView {
    return { id, name };
  }

  private mapToHappeningView({ id, name, description, isPublish }: Happening): IHappeningView {
    return { id, name, description, isPublish };
  }
}
