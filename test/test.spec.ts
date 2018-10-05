import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matching-member.service';

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

    describe('Matching member', function(){
        it('Every member has random matched member', function(){

        });

        it('Matched member has another id', function () {

        });

        it('Every matched is unique', function () {

        });
    })
});

/*
*   generate by https://www.json-generator.com/#
*/
const MEMBER_INITIAL_LIST_MOCK = [
    {
        id: '0',
        name: "Madden",
        uniqueLink: "20ae7a68-42e7-437f-8d06-14a3b63746be",
        matchedMemberId: null
    },
    {
        id: '1',
        name: "Sloan",
        uniqueLink: "fb453a3a-1373-4575-9312-17d924383ea1",
        matchedMemberId: null
    },
    {
        id: '2',
        name: "Clemons",
        uniqueLink: "67664cb8-e500-460c-b373-8c83aa185ae6",
        matchedMemberId: null
    },
    {
        id: '3',
        name: "Toni",
        uniqueLink: "7036177c-2c9f-47c7-9ded-c30c3aa23271",
        matchedMemberId: null
    },
    {
        id: '4',
        name: "Valeria",
        uniqueLink: "5711bba2-99b8-4da7-a0c1-a567f6b724be",
        matchedMemberId: null
    },
    {
        id: '5',
        name: "Elva",
        uniqueLink: "ba575312-4713-41f9-a65e-b9858f2fe7cf",
        matchedMemberId: null
    }
];