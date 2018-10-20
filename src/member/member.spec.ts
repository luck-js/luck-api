import * as assert from 'assert';
import { Container } from 'inversify';
import { createHappening, initialDependencies } from '../test/test.spec';
import { Happening } from '../happening/happening';
import { MEMBER_INITIAL_LIST_MOCK } from './member.mock';
import { RoleType } from './event-member-role/event-member-role.model';


describe('Member', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, { name: 'Initial Happening' });
    });

    describe('Creating new members', function () {
        it('Added member should be unique link ', function () {
            const billMember = happening.addMember('Bill', RoleType.PARTICIPANT);

            assert.notStrictEqual(billMember.uniqueLink, null);
        });
    });
});
