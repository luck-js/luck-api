import * as assert from 'assert';
import * as sinon from 'sinon';
import { Container } from 'inversify';
import { HappeningFactory } from './happening.factory';
import { Happening } from './happening';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';

describe('Happening', function() {
  let DIContainer: Container;
  let happeningFactory: HappeningFactory;
  let happening: Happening;

  beforeEach(function() {
    DIContainer = DIContainerProvider();
    happeningFactory = DIContainer.get<HappeningFactory>(IDENTIFIER.HappeningFactory);
    happening = happeningFactory.create();
  });

  describe('Creating new happening', function() {
    it('Created happening should be set isPublish to false', function() {
      assert.strictEqual(false, happening.isPublish);
    });

    it('Created happening should be unique id', function() {
      const happeningSecond = happeningFactory.create();
      assert.notStrictEqual(happeningSecond.id, happening.id);
    });
  });

  describe('Creating new members', function() {
    it('Publishing happening should be closed on creating new members', function() {
      happening.publishEvent();
      assert.throws(() => happening.createMember(RoleType.PARTICIPANT));
    });
  });

  describe('Publish happening event', function() {
    it("Members shouldn't has matched when happening wasn't publishing", function() {
      let matchMemberStub = sinon.stub(happening, 'matchMember');
      sinon.assert.notCalled(matchMemberStub);
    });

    it('Publishing should matched members', function() {
      let matchMemberStub = sinon.stub(happening, 'matchMember');
      happening.publishEvent();
      sinon.assert.calledOnce(matchMemberStub);
    });
  });
});
