import IDENTIFIER from '../infrastructure/identifiers';
import { ContainerModule, interfaces } from 'inversify';
import { IMemberParticipationRepository } from '../domain/member-participation/member-participation.repository';
import { IHappeningRepository } from '../domain/happening/happening.repository';
import { IMemberRepository } from '../domain/member/member.repository';
import { MemberMockRepository } from '../domain/member/member-mock.repository';
import { HappeningMockRepository } from '../domain/happening/happening-mock.repository';
import { MemberParticipationMockRepository } from '../domain/member-participation/member-participation-mock.repository';
import { MEMBER_INITIAL_LIST_MOCK } from '../domain/member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';

const ApplicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    const memberMockRepository = new MemberMockRepository(MEMBER_INITIAL_LIST_MOCK);
    const happeningMockRepository = new HappeningMockRepository(HAPPENING_INITIAL_LIST_MOCK);
    const memberParticipationMockRepository = new MemberParticipationMockRepository(
      MEMBER_PARTICIPATIONS_INITIAL_MOCK,
    );

    rebind<IMemberParticipationRepository>(IDENTIFIER.MemberParticipationRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return memberParticipationMockRepository;
      })
      .inSingletonScope();
    rebind<IHappeningRepository>(IDENTIFIER.HappeningRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return happeningMockRepository;
      })
      .inSingletonScope();
    rebind<IMemberRepository>(IDENTIFIER.MemberRepository)
      .toDynamicValue((context: interfaces.Context) => {
        return memberMockRepository;
      })
      .inSingletonScope();
  },
);

export { ApplicationContainerModule };
