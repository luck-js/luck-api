import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matchingMemberService';

describe('Members of happening', function () {
    let happening;

    beforeEach(function () {
        happening = new Happening(new MemberRepository(MEMBER_INITIAL_LIST_MOCK), new MatchingMemberService());
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
});

const MEMBER_INITIAL_LIST_MOCK = [
    {
        id: '0',
        matchedMemberId: null
    },
    {
        id: '1',
        matchedMemberId: null
    },
    {
        id: '2',
        matchedMemberId: null
    },
    {
        id: '3',
        matchedMemberId: null
    },
    {
        id: '4',
        matchedMemberId: null
    },
    {
        id: '5',
        matchedMemberId: null
    },
    {
        id: '6',
        matchedMemberId: null
    }
];