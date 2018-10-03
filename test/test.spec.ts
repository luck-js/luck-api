import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';

describe('Members of happening', function(){
    it('Created member should be unique link ', function(){
        const Happening = {
            createMember: sinon.spy()
        };

        const billMember = Happening.createMember('Bill');

        assert.notStrictEqual(billMember.uniqueLink,null);
    })
});