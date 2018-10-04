import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';

describe('Members of happening', function(){
    const Happening = {
        isPublish: sinon.spy(),
        addMember: sinon.stub()
    };

    it('Added member should be unique link ', function(){
        Happening.addMember.returns({
            uniqueLink: 'ed3f768sa'
        });

        const billMember = Happening.addMember('Bill');

        assert.notStrictEqual(billMember.uniqueLink,null);
    });


    it('Publishing happening should be closed on adding new members', function(){
        Happening.isPublish.returned(false);
        Happening.addMember.throws();

        assert.throws(function(){
            Happening.addMember('Bill');
        })
    });
});