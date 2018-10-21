import * as assert from 'assert';
import { Container } from 'inversify';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { Happening } from './happening';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { MatchingMemberService } from '../services/matching-member.service';
import { HappeningFactory } from './happening.factory';

describe('Happening', function () {
    let DIContainer: Container;
    let happeningFactory: HappeningFactory;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = DIContainerProvider([...MEMBER_INITIAL_LIST_MOCK]);
        happeningFactory = DIContainer.get<HappeningFactory>(IDENTIFIER.HappeningFactory);
        happening = happeningFactory.create();
    });

    describe('Creating new happening', function () {

        it('Created happening should be set isPublish to false', function () {
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function () {
            const happeningSecond = happeningFactory.create();

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });

    describe('Creating new members', function () {
        it('Publishing happening should be closed on adding new members', function () {
            happening.publishEvent();

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
