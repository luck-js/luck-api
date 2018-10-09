import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matching-member.service';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {MemberFactory} from '../member/member.factory';
import {UuidGenerationService} from '../member/uuid-generation.service';

describe('Members of happening', function () {
    let happening;

    beforeEach(function () {
        happening = new Happening(
            new MemberRepository([...MEMBER_INITIAL_LIST_MOCK]),
            new MatchingMemberService(),
            new MemberFactory(new UuidGenerationService()));
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

    describe('Matching member', function(){
        const matchingMemberService = new MatchingMemberService();
        const newMemberList = matchingMemberService.randomMembers(MEMBER_INITIAL_LIST_MOCK);

        it('Every member has random matched member', function(){
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
            },[])
        });
    })
});