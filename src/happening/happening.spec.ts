import * as assert from 'assert';
import { Container } from 'inversify';
import { createHappening, initialDependencies } from '../test/test.spec';
import { Happening } from './happening';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { MatchingMemberService } from '../services/matching-member.service';

describe('Happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, { name: 'Initial Happening' });
    });

    describe('Creating new happening', function () {

        it('Created happening should be set isPublish to false', function () {
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function () {
            const happeningSecond = createHappening(DIContainer, { name: 'Second Happening' });

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });

    describe('Creating new members', function () {
        it('Publishing happening should be closed on adding new members', function () {
            happening.isPublish = true;

            assert.throws(() => happening.addMember('Bill', RoleType.PARTICIPANT))
        });
    });

    describe('Publish happening event', function () {
        it('members shoudnt has matched when happening wasnt publishing', function () {
            MatchingMemberService.filterMembersWhoAbleToRandom(happening.getMemberList()).forEach((member, index) => {
                assert.strictEqual(false, typeof member.MatchedMemberId === 'string')
            })
        });

        it('publishing should matched members', function () {
            happening.publishEvent();

            MatchingMemberService.filterMembersWhoAbleToRandom(happening.getMemberList()).forEach((member, index) => {
                assert.strictEqual(true, typeof member.MatchedMemberId === 'string')
            })
        });
    });
});
