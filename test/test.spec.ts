import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matching-member.service';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {MemberFactory} from '../member/member.factory';
import {UuidGenerationService} from '../member/uuid-generation.service';
import {RelationMemberHappeningRepository} from '../relation-member-happening/relation-member-happening.repository';
import {RelationMemberHappeningFactory} from '../relation-member-happening/relation-member-happening.factory';
import {HappeningFactory} from '../happening/happening.factory';

describe('Happening', function(){
    let happening;
    let happeningFactory;

    beforeEach(function () {
        happeningFactory = new HappeningFactory(
            new MemberRepository([...MEMBER_INITIAL_LIST_MOCK]),
            new RelationMemberHappeningRepository(),
            new MatchingMemberService(),
            new UuidGenerationService(),
            new RelationMemberHappeningFactory(),
            new MemberFactory()
        );

        happening = happeningFactory.create('initialHappening', '')
    });

    describe('Creating new happening', function(){

        it('Created happening should be set isPublish to false', function(){
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function(){
            const happeningSecond = happeningFactory.create('', '');

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });
});

describe('Members of happening', function () {
    let happening;

    beforeEach(function () {
        const happeningFactory = new HappeningFactory(
            new MemberRepository([...MEMBER_INITIAL_LIST_MOCK]),
            new RelationMemberHappeningRepository(),
            new MatchingMemberService(),
            new UuidGenerationService(),
            new RelationMemberHappeningFactory(),
            new MemberFactory()
        );

        happening = happeningFactory.create('', '')
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

describe('Relation member happening', function(){
    let happening;
    let happeningFactory;
    let relationMemberHappeningRepository = new RelationMemberHappeningRepository();

    beforeEach(function () {
        happeningFactory = new HappeningFactory(
            new MemberRepository(),
            relationMemberHappeningRepository,
            new MatchingMemberService(),
            new UuidGenerationService(),
            new RelationMemberHappeningFactory(),
            new MemberFactory()
        );

        happening = happeningFactory.create('initialHappening', '')
    });

    describe('Created relation after add member', function(){

        it('Relation should be created member of happening to happening', function(){
            const billMember = happening.addMember('Bill');
            const relation = relationMemberHappeningRepository.get(billMember.relationId);

            assert.strictEqual(billMember.id, relation.memberId);
        });
    });
});
