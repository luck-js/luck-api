import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';

describe('Members of happening', function () {
    let happening;

    beforeEach(function () {
        happening = new Happening(null);
    });

    it('Added member should be unique link ', function () {
        /*sinon.stub(happening, 'addMember').returns({
            uniqueLink: 'ed3f768sa'
        });*/

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
        /*const billMember = {
            matchedMemberId: 'e2'
        };

        sinon.stub(happening, 'getMembers').returns([billMember, billMember]);*/
        happening.getMembers().forEach((member) => {
            assert.notStrictEqual(member.matchedMemberId, null)
        })
    })
});