import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';

describe('Members of happening', function () {
    let happening;

    beforeEach(function () {
        const memberRepository = sinon.createStubInstance(MemberRepository, {
            add: sinon.stub(),
            getList: sinon.stub(),
        });

        memberRepository.add.returns({
            uniqueLink: 'ed3f768sa'
        });
        const billMember = {
            matchedMemberId: 'e2'
        };

        memberRepository.getList.returns([billMember, billMember]);

        happening = new Happening(memberRepository);
    });

    it('Added member should be unique link ', function () {
        const billMember = happening.addMember('Bill');

        assert.notStrictEqual(billMember.uniqueLink, null);
    });


    it('Publishing happening should be closed on adding new members', function () {
        happening.isPublish = true;

        assert.throws(function () {
            happening.addMember('Bill');
        })
    });


    it('Publishing happening should match members', function () {
        happening.getMembers().forEach((member) => {
            assert.notStrictEqual(member.matchedMemberId, null)
        })
    })
});