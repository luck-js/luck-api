import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { DIContainerProvider } from '../di-container';
import { Happening } from '../happening/happening';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { RelationMemberHappeningService } from './relation-member-happening.service';

describe('Relation member happening', function () {
    const HAPPENING_NAME = 'initialHappening';
    let relationId: string;
    let DIContainer: Container;
    let happening: Happening;
    let relationMemberHappeningService: RelationMemberHappeningService;

    beforeEach(function () {
        DIContainer = DIContainerProvider([...MEMBER_INITIAL_LIST_MOCK]);
        relationMemberHappeningService = DIContainer.get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);
        relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
        happening = relationMemberHappeningService.editHappening(relationId, { name: HAPPENING_NAME });
    });

    describe('Created relation after add member', function () {

        it('Relation should be created member of happening to happening', function () {
            const relationMemberHappeningRepository = DIContainer
                .get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);

            const MEMBER_NAME = 'Bill';

            const billMember = relationMemberHappeningService.addParticipant(relationId, MEMBER_NAME);
            const relation = relationMemberHappeningRepository.get(billMember.relationId);

            assert.strictEqual(billMember.id, relation.getMember().id);
        });
    });
});
