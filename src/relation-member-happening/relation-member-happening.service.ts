import { injectable } from 'inversify';
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

    public createOwnerRelationOfHappening(): string {
        const relationId = this.relationMemberHappeningFactory.generateUuid();

        const happening = this.happeningFactory.create();
        const member = happening.addMember(relationId, RoleType.ORGANISER);

        const relation = this.relationMemberHappeningFactory.create(relationId, happening, member);

        this.happeningRepository.add(happening);

        this.relationMemberHappeningRepository.add(relation);

        return relation.Id;
    }

    public editHappening(relationId: string, option): Happening {
        const { name, description } = option;
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();
        const editedHappening = Object.assign({}, happening, { name, description });
        return this.happeningRepository.update(happening.id, editedHappening);
    }

    public publish(relationId: string): Happening {
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();
        happening.publishEvent();
        return this.happeningRepository.update(happening.id, happening);
    }

    public addParticipant(ownerRelationId: string, name: string): Member {
        const ownerRelation = this.relationMemberHappeningRepository.get(ownerRelationId);
        const happening = ownerRelation.getHappening();
        const newRelationId = this.relationMemberHappeningFactory.generateUuid();
        const member = happening.addMember(newRelationId, RoleType.PARTICIPANT, name);

        const relation = this.relationMemberHappeningFactory.create(newRelationId, happening, member);
        this.happeningRepository.update(happening.id, happening);
        this.relationMemberHappeningRepository.add(relation);

        return member;
    }

    public getDataView(id: string): IParticipationHappeningView {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = this.mapToMemberView(relation.getMember());
        const happening = this.mapToHappeningView(relation.getHappening());

        return {
            member, happening
        }
    }

    public getDetailedParticipantListInformation(relationId: string): IParticipantUniqueLinkData[] {
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();

        return happening.getMemberList()
            .filter((member) => member.eventMemberRole.type !== RoleType.ORGANISER)
            .map((member) => this.mapToIParticipantUniqueLinkData(member));
    }

    public getMatchedMember(idRelation: string): IMatchedParticipationData {
        const relation = this.relationMemberHappeningRepository.get(idRelation);
        const member = relation.getMember();
        const matchedMemberId = member.MatchedMemberId;

        const me = this.mapToMemberView(member);
        const matchedMember = this.mapToMemberView(relation.getHappening().getMember(matchedMemberId));

        return { me, matchedMember };
    }

    public generateDetailedParticipantListInformation(
        relationId: string,
        newHappeningView: INewHappeningView): IParticipantUniqueLinkData[] {
        const { participantList, name, description } = newHappeningView;
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();

        participantList.map(({ name }) => {
            const newRelationId = this.relationMemberHappeningFactory.generateUuid();
            const member = happening.addMember(newRelationId, RoleType.PARTICIPANT, name);
            const relation = this.relationMemberHappeningFactory.create(newRelationId, happening, member);
            this.relationMemberHappeningRepository.add(relation);
        });
        happening.publishEvent();

        const editedHappening = Object.assign({}, happening, { name, description });

        this.happeningRepository.update(editedHappening.id, editedHappening);

        return this.getDetailedParticipantListInformation(relationId);
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
