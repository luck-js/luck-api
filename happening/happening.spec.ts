import * as assert from 'assert';
import {Container} from 'inversify';
import IDENTIFIER from '../identifiers';
import {createHappening, initialDependencies} from '../test/test.spec';
import {Happening} from './happening';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {MatchingMemberService} from '../member/matching-member.service';

describe('Happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Creating new happening', function () {

        it('Created happening should be set isPublish to false', function () {
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function () {
            const happeningSecond = createHappening(DIContainer, {name: 'Second Happening'});

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });
});

describe('Members of happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Creating new members', function () {
        it('Added member should be unique link ', function () {
            const billMember = happening.addMember('Bill');

            assert.notStrictEqual(billMember.uniqueLink, null);
        });

        it('Publishing happening should be closed on adding new members', function () {
            happening.isPublish = true;

            assert.throws(() => happening.addMember('Bill'))
        });
    });

    describe('Publish happening event', function () {
        it('members shoudnt has matched when happening wasnt publishing', function () {
            happening.getMembers().forEach((member, index) => {
                assert.strictEqual(false, typeof member.matchedMemberId === 'string')
            })
        });

        it('publishing should matched members', function () {
            happening.publishEvent();

            happening.getMembers().forEach((member, index) => {
                assert.strictEqual(true, typeof member.matchedMemberId === 'string')
            })
        });
    });

    describe('Matching member', function () {
        let newMemberList;

        before(function () {
            const matchingMemberService = DIContainer.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
            newMemberList = matchingMemberService.randomMembers(MEMBER_INITIAL_LIST_MOCK);
        });

        it('Every member has random matched member', function () {
            newMemberList.forEach((member, index) => {
                assert.strictEqual(true, typeof member.matchedMemberId === 'string')
            })
        });

        it('Matched member has another id', function () {
            newMemberList.forEach((member, index) => {
                assert.strictEqual(true, member.id !== member.matchedMemberId)
            })
        });

        it('Every matched is unique', function () {
            newMemberList.reduce((previousState, member) => {
                const isUnique = !previousState.some((matchedMemberId) => matchedMemberId === member.matchedMemberId);
                assert.strictEqual(true, isUnique);
                previousState.push(member.matchedMemberId);
                return previousState;
            }, [])
        });
    })
});