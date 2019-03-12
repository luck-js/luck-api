import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import { AddParticipantMember } from './add-participant-member';
import { MemberMockRepository } from '../domain/member/member-mock.repository';
import { HappeningMockRepository } from '../domain/happening/happening-mock.repository';
import { MemberParticipationMockRepository } from '../domain/member-participation/member-participation-mock.repository';
import { MEMBER_INITIAL_LIST_MOCK } from '../domain/member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { DIContainer } from '../infrastructure/di-container';
import { IMemberParticipationRepository } from '../domain/member-participation/member-participation.repository';
import { interfaces } from 'inversify';
import { IHappeningRepository } from '../domain/happening/happening.repository';
import { IMemberRepository } from '../domain/member/member.repository';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import * as assert from 'assert';

describe('AddParticipantMember', function() {
  let memberMockRepository: MemberMockRepository;
  let happeningMockRepository: HappeningMockRepository;
  let memberParticipationMockRepository: MemberParticipationMockRepository;
  let addParticipantMember: AddParticipantMember;

  beforeEach(function() {
    memberMockRepository = new MemberMockRepository(MEMBER_INITIAL_LIST_MOCK);
    happeningMockRepository = new HappeningMockRepository(HAPPENING_INITIAL_LIST_MOCK);
    memberParticipationMockRepository = new MemberParticipationMockRepository(
      MEMBER_PARTICIPATIONS_INITIAL_MOCK,
    );
    DIContainer.rebind<IMemberParticipationRepository>(IDENTIFIER.MemberParticipationRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return memberParticipationMockRepository;
      })
      .inSingletonScope();
    DIContainer.rebind<IHappeningRepository>(IDENTIFIER.HappeningRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return happeningMockRepository;
      })
      .inSingletonScope();
    DIContainer.rebind<IMemberRepository>(IDENTIFIER.MemberRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return memberMockRepository;
      })
      .inSingletonScope();
    addParticipantMember = DIContainer.get<AddParticipantMember>(IDENTIFIER.AddParticipantMember);
  });

  it('executed method return member view value object', function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    const newParticipantMemberName = 'addedParticipantMember';
    addParticipantMember
      .execute(memberParticipationId, newParticipantMemberName)
      .subscribe(memberView => {
        assert.strictEqual(memberView.name, newParticipantMemberName);
        assert.strictEqual(typeof memberView.id, 'string');
      });
  });
});
