import { injectable } from 'inversify';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMatchedParticipationData, IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { HappeningRepository } from '../happening/happening.repository';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { IHappeningView, INewHappeningView } from './happening-view.model';
import { ICreatedHappening, IParticipantUniqueLinkData } from './created-happening-view';

@injectable()
export class RelationMemberHappeningService {
  constructor(
    private relationMemberHappeningRepository: RelationMemberHappeningRepository,
    private happeningRepository: HappeningRepository,
    private happeningFactory: HappeningFactory,
    private relationMemberHappeningFactory: RelationMemberHappeningFactory,
  ) {}

  public createOwnerRelationOfHappening(): Observable<string> {
    const relationId = this.relationMemberHappeningFactory.generateUuid();

    const happening = this.happeningFactory.create();

    return this.happeningRepository.add(happening).pipe(
      switchMap(() => happening.addMember(relationId, RoleType.ORGANISER)),
      switchMap(member => {
        const relation = this.relationMemberHappeningFactory.create(relationId, happening, member);
        return this.relationMemberHappeningRepository.add(relation);
      }),
      map(relation => relation.id),
    );
  }

  public editHappening(relationId: string, option): Observable<Happening> {
    const { name, description } = option;

    return this.getHappeningObservable(relationId).pipe(
      map(happening => Object.assign({}, happening, { name, description })),
      switchMap(editedHappening =>
        this.happeningRepository.update(editedHappening.id, editedHappening),
      ),
    );
  }

  public publish(relationId: string): Observable<Happening> {
    return this.getHappeningObservable(relationId).pipe(
      switchMap(happening => happening.publishEvent().pipe(map(() => happening))),
      switchMap(happening => this.happeningRepository.update(happening.id, happening)),
    );
  }

  public addParticipant(ownerRelationId: string, name: string): Observable<Member> {
    return this.getHappeningObservable(ownerRelationId).pipe(
      switchMap(happening =>
        this.createMember(happening, RoleType.PARTICIPANT, name).pipe(
          switchMap(member =>
            this.happeningRepository.update(happening.id, happening).pipe(map(happening => member)),
          ),
        ),
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
    return this.getHappeningObservable(relationId).pipe(
      switchMap(happening => this.getDetailedParticipantListInformationFromHappening(happening)),
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
    return this.getHappeningObservable(relationId).pipe(
      switchMap(happening =>
        this.getDetailedParticipantListInformationFromHappening(happening).pipe(
          map(participantList => ({
            participantList,
            name: happening.name,
            description: happening.description,
          })),
        ),
      ),
    );
  }

  public generateDetailedParticipantListInformation(
    relationId: string,
    newHappeningView: INewHappeningView,
  ): Observable<ICreatedHappening> {
    const { participantList, name, description } = newHappeningView;

    return this.getHappeningObservable(relationId).pipe(
      switchMap(happening =>
        forkJoin(
          participantList.map(({ name }) =>
            this.createMember(happening, RoleType.PARTICIPANT, name),
          ),
        ).pipe(
          switchMap(() => happening.publishEvent()),
          map(() => Object.assign({}, happening, { name, description })),
        ),
      ),
      switchMap(editedHappening =>
        this.happeningRepository.update(editedHappening.id, editedHappening),
      ),
      switchMap(happening =>
        this.getDetailedParticipantListInformationFromHappening(happening).pipe(
          map(participantList => ({
            participantList,
            name: happening.name,
            description: happening.description,
          })),
        ),
      ),
    );
  }

  private getDetailedParticipantListInformationFromHappening(
    happening: Happening,
  ): Observable<IParticipantUniqueLinkData[]> {
    return happening
      .getMemberList()
      .pipe(
        map(memberList =>
          memberList
            .filter(member => member.eventMemberRole.type !== RoleType.ORGANISER)
            .map(member => this.mapToIParticipantUniqueLinkData(member)),
        ),
      );
  }

  private createMember(happening: Happening, role: RoleType, name: string): Observable<Member> {
    const newRelationId = this.relationMemberHappeningFactory.generateUuid();

    return happening.addMember(newRelationId, role, name).pipe(
      switchMap(member => {
        const relation = this.relationMemberHappeningFactory.create(
          newRelationId,
          happening,
          member,
        );
        return this.relationMemberHappeningRepository.add(relation).pipe(map(relation => member));
      }),
    );
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

  private mapToIParticipantUniqueLinkData({
    name,
    relationId,
  }: Member): IParticipantUniqueLinkData {
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
