import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMatchedParticipationData, IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { HappeningRepository } from '../happening/happening.repository';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { IParticipantUniqueLinkData } from './participant-unique-link-data';
import { IHappeningView, INewHappeningView } from './happening-view.model';

@injectable()
export class RelationMemberHappeningService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private happeningRepository: HappeningRepository,
        private happeningFactory: HappeningFactory,
        private relationMemberHappeningFactory: RelationMemberHappeningFactory) {
    }

    public createOwnerRelationOfHappening(): Observable<string> {

        const relationId = this.relationMemberHappeningFactory.generateUuid();

        const happening = this.happeningFactory.create();
        const member = happening.addMember(relationId, RoleType.ORGANISER);

        const relation = this.relationMemberHappeningFactory.create(relationId, happening, member);

        this.relationMemberHappeningRepository.add(relation);

        return this.happeningRepository.add(happening).pipe(
            map((_) => relation.Id)
        )

    }

    public editHappening(relationId: string, option): Observable<Happening> {
        const { name, description } = option;
        const relation = this.relationMemberHappeningRepository.get(relationId);

        return relation.getHappening().pipe(
            map((happening) => Object.assign({}, happening, { name, description })),
            switchMap((editedHappening) => this.happeningRepository.update(editedHappening.id, editedHappening))
        )
    }

    public publish(relationId: string): Observable<Happening> {
        const relation = this.relationMemberHappeningRepository.get(relationId);

        return relation.getHappening().pipe(
            tap((happening) => happening.publishEvent()),
            switchMap((happening) => this.happeningRepository.update(happening.id, happening))
        )
    }

    public addParticipant(ownerRelationId: string, name: string): Observable<Member> {
        const ownerRelation = this.relationMemberHappeningRepository.get(ownerRelationId);

        return ownerRelation.getHappening().pipe(
            map((happening) => {
                const newRelationId = this.relationMemberHappeningFactory.generateUuid();
                const member = happening.addMember(newRelationId, RoleType.PARTICIPANT, name);

                const relation = this.relationMemberHappeningFactory.create(newRelationId, happening, member);
                this.relationMemberHappeningRepository.add(relation);
                this.happeningRepository.update(happening.id, happening);

                return member;
            })
        )

    }

    public getDataView(id: string): Observable<IParticipationHappeningView> {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = this.mapToMemberView(relation.getMember());

        return relation.getHappening().pipe(
            map((happening) => this.mapToHappeningView(happening)),
            map((happening) => ({ member, happening }))
        )
    }

    public getDetailedParticipantListInformation(relationId: string): Observable<IParticipantUniqueLinkData[]> {
        const relation = this.relationMemberHappeningRepository.get(relationId);

        return relation.getHappening().pipe(
            switchMap((happening) => happening.getMemberList()),
            map((memberList) => memberList
                .filter((member) => member.eventMemberRole.type !== RoleType.ORGANISER)
                .map((member) => this.mapToIParticipantUniqueLinkData(member)))
        );
    }

    public getMatchedMember(idRelation: string): Observable<IMatchedParticipationData> {
        const relation = this.relationMemberHappeningRepository.get(idRelation);
        const member = relation.getMember();
        const matchedMemberId = member.MatchedMemberId;

        const me = this.mapToMemberView(member);

        return relation.getHappening().pipe(
            switchMap((happening) => happening.getMember(matchedMemberId)),
            map((matchedMember) => this.mapToMemberView(matchedMember)),
            map((matchedMember) => ({ me, matchedMember }))
        )
    }

    public generateDetailedParticipantListInformation(
        relationId: string,
        newHappeningView: INewHappeningView): Observable<IParticipantUniqueLinkData[]> {

        const { participantList, name, description } = newHappeningView;
        const relation = this.relationMemberHappeningRepository.get(relationId);

        return relation.getHappening().pipe(
            map((happening) => {
                participantList.map(({ name }) => {
                    const newRelationId = this.relationMemberHappeningFactory.generateUuid();
                    const member = happening.addMember(newRelationId, RoleType.PARTICIPANT, name);
                    const relation = this.relationMemberHappeningFactory.create(newRelationId, happening, member);
                    this.relationMemberHappeningRepository.add(relation);
                });
                happening.publishEvent();

                return Object.assign({}, happening, { name, description });
            }),
            switchMap((editedHappening) => this.happeningRepository.update(editedHappening.id, editedHappening)),
            switchMap(() => this.getDetailedParticipantListInformation(relationId))
        )
    }

    private mapToIParticipantUniqueLinkData({ name, relationId }: Member): IParticipantUniqueLinkData {
        const uniqueLink = this.mapToUniqueLink(relationId);
        return { name, uniqueLink }
    }

    private mapToUniqueLink(id: string): string {
        return id;
    }

    private mapToMemberView({ id, name }: Member): IMemberView {
        return { id, name }
    }

    private mapToHappeningView({ id, name, description, isPublish }: Happening): IHappeningView {
        return { id, name, description, isPublish }
    }
}
