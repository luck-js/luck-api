import * as assert from 'assert';
import * as sinon from 'sinon';
import { Container } from 'inversify';
import { HappeningFactory } from './happening.factory';
import { Happening } from './happening';
import { DIContainerProvider } from '../../infrastructure/di-container';
import IDENTIFIER from '../../infrastructure/identifiers';
import { Member } from '../member/member';

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
      const member: Member = sinon.mock(Member);
      assert.throws(() => happening.addMember(member));
    });
  });

  describe('Not Published happening', function() {
    it("Members could updated when happening isn't publishing", function() {
      const members: Member[] = sinon.mock([Member]);
      assert.doesNotThrow(() => happening.updateMembers(members));
    });

    it("Happening throw error when isn't publishing", function() {
      assert.throws(() => happening.getMatchedMember('1'));
    });
  });

  describe('Published happening', function() {
    it("Members couldn't updated when happening is publishing", function() {
      happening.publishEvent();
      const members: Member[] = sinon.mock([Member]);
      assert.throws(() => happening.updateMembers(members));
    });

    it("Happening don't throw error when is publishing", function() {
      happening.publishEvent();
      assert.doesNotThrow(() => happening.getMatchedMember('1'));
    });
  });
});
