import { injectable } from 'inversify';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { HappeningRepository } from '../happening/happening.repository';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';

@injectable()
export class RelationMemberHappeningService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private happeningRepository: HappeningRepository,
        private happeningFactory: HappeningFactory,
        private relationMemberHappeningFactory: RelationMemberHappeningFactory) {
    }

    public createHappening(): string {
        const relationId = this.relationMemberHappeningFactory.generateUuid();

        const happening = this.happeningFactory.create();
        const member = happening.addMember(relationId);

        const relation = this.relationMemberHappeningFactory.create(relationId, happening, member);

        this.happeningRepository.add(happening);

        this.relationMemberHappeningRepository.add(relation);

        return relation.Id;
    }

    public editHappening(relationId: string, { name, description }): Happening {
        const relation = this.relationMemberHappeningRepository.get(relationId);
        const happening = relation.getHappening();
        const editedHappening = Object.assign({}, happening, { name, description });
        return this.happeningRepository.update(happening.id, editedHappening);
    }

    public addMember(ownerRelationId: string, name: string): Member {
        const ownerRelation = this.relationMemberHappeningRepository.get(ownerRelationId);
        const happening = ownerRelation.getHappening();
        const newRelationId = this.relationMemberHappeningFactory.generateUuid();
        const member = happening.addMember(newRelationId, name);

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

    public getMatchedMember(idRelation: string): IMemberView {
        const relation = this.relationMemberHappeningRepository.get(idRelation);
        const { matchedMemberId } = relation.getMember();
        const { id, name }  = relation.getHappening().getMember(matchedMemberId);

        return { id, name };
    }
}
