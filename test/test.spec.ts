import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';

describe('Members of happening', function () {
    const happening = sinon.createStubInstance(Happening, {
        addMember: sinon.stub(),
        getMembers: sinon.stub(),
    });

    it('Added member should be unique link ', function () {
        happening.addMember.returns({
            uniqueLink: 'ed3f768sa'
        });

        const billMember = happening.addMember('Bill');

        assert.notStrictEqual(billMember.uniqueLink,null);
    });


    it('Publishing happening should be closed on adding new members', function () {
        happening.isPublish = false;
        happening.addMember.throws();

        assert.throws(function () {
            happening.addMember('Bill');
        })
    });


    it('Publishing happening should match members', function () {
        const billMember = {
            matchedMemberId: 'e2'
        };

        happening.getMembers.returns([billMember, billMember]);
        happening.getMembers().forEach((member) => {
            assert.notStrictEqual(member.matchedMemberId, null)
        })
    })
});