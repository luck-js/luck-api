import * as assert from 'assert';
import {Container} from 'inversify';
import IDENTIFIER from '../identifiers';
import {createHappening, initialDependencies} from '../test/test.spec';
import {Happening} from '../happening/happening';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {RelationMemberHappeningRepository} from './relation-member-happening.repository';

describe('Relation member happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Created relation after add member', function () {

        it('Relation should be created member of happening to happening', function () {
            const relationMemberHappeningRepository = DIContainer.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);

            const billMember = happening.addMember('Bill');
            const relation = relationMemberHappeningRepository.get(billMember.relationId);

            assert.strictEqual(billMember.id, relation.memberId);
        });
    });
});