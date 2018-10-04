import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';

describe('Members of happening', function(){
    it('Added member should be unique link ', function(){
        const Happening = {
            isPublish: false,
            addMember: sinon.spy()
        };

        const billMember = Happening.addMember('Bill');

        assert.notStrictEqual(billMember.uniqueLink,null);
    });


    it('Publishing happening should be closed on adding new members', function(){
        const Happening = {
            isPublish: true,
            addMember: sinon.stub().throws()
        };

        assert.throws(function(){
            Happening.addMember('Bill');
        })
    });
});