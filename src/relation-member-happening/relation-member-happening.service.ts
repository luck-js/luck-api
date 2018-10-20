import { injectable } from 'inversify';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { HappeningRepository } from '../happening/happening.repository';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { IParticipantUniqueLinkData } from './participant-unique-link-data';

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

        this.relationMemberHappeningRepository.add(relation);

        return member;
    }

    public getDataView(id: string): IParticipationHappeningView {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = relation.getMember();
        const happening = relation.getHappening();

        return {
            member, happening
        }
    }

    public getDetailedParticipantListInformation(relationId: string): IParticipantUniqueLinkData[] {
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();

        return happening.getMemberList()
            .filter((member) => member.eventMemberRole.type !== RoleType.ORGANISER)
            .map(({ name, uniqueLink }) => ({ name, uniqueLink }));
    }

    public getMatchedMember(idRelation: string): IMemberView {
        const relation = this.relationMemberHappeningRepository.get(idRelation);
        const member = relation.getMember();
        const matchedMemberId = member.MatchedMemberId;
        const { id, name } = relation.getHappening().getMember(matchedMemberId);

        return { id, name };
    }
}
