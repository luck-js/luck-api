import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import IDENTIFIER from './identifiers';
import { MemberParticipationRepository } from './domain/member-participation/member-participation.repository';
import { MemberRepository } from './domain/member/member.repository';
import { HappeningRepository } from './domain/happening/happening.repository';
import { HappeningFactory } from './domain/happening/happening.factory';
import { MatchingService } from './services/matching.service';
import { UuidGenerationService } from './domain/member/uuid-generation.service';
import { MemberParticipationFactory } from './domain/member-participation/member-participation.factory';
import { MemberFactory } from './domain/member/member.factory';
import { Member } from './domain/member/member';
import { MemberParticipationService } from './domain/member-participation/member-participation.service';
import { ParticipationHappeningApi } from './routes/participation-happening.api';
import { IMember } from './domain/member/member.model';
import { MatchingMemberService } from './services/matching-member.service';
import { HappeningApi } from './routes/happening.api';
import { EventMemberRoleFactory } from './domain/member/event-member-role/event-member-role.factory';
import { HappeningService } from './domain/happening/happening.service';
import { MemberService } from './domain/member/member.service';

const DIContainerProvider = (
  MEMBER_INITIAL_LIST_MOCK?,
  HAPPENING_INITIAL_LIST_MOCK?,
  MEMBER_PARTICIPATIONS_INITIAL_MOCK?,
): Container => {
  const DIContainer = new Container();

  DIContainer.bind<MemberParticipationRepository>(IDENTIFIER.MemberParticipationRepository)
    .toDynamicValue((context: interfaces.Context) => {
      return new MemberParticipationRepository();
    })
    .inSingletonScope();

  DIContainer.bind<MemberRepository>(IDENTIFIER.MemberRepository)
    .toDynamicValue((context: interfaces.Context) => {
      return new MemberRepository();
    })
    .inSingletonScope();

  DIContainer.bind<MatchingService>(IDENTIFIER.MatchingService).to(MatchingService);

  DIContainer.bind<MemberService>(IDENTIFIER.MemberService).toDynamicValue(
    (context: interfaces.Context) => {
      const memberRepository = context.container.get<MemberRepository>(IDENTIFIER.MemberRepository);
      const memberFactory = context.container.get<MemberFactory>(IDENTIFIER.MemberFactory);

      return new MemberService(memberRepository, memberFactory);
    },
  );

  DIContainer.bind<HappeningService>(IDENTIFIER.HappeningService).toDynamicValue(
    (context: interfaces.Context) => {
      const memberService = context.container.get<MemberService>(IDENTIFIER.MemberService);
      const happeningRepository = context.container.get<HappeningRepository>(
        IDENTIFIER.HappeningRepository,
      );
      const happeningFactory = context.container.get<HappeningFactory>(IDENTIFIER.HappeningFactory);

      return new HappeningService(memberService, happeningRepository, happeningFactory);
    },
  );

  DIContainer.bind<MatchingMemberService>(IDENTIFIER.MatchingMemberService).toDynamicValue(
    (context: interfaces.Context) => {
      const matchingService = context.container.get<MatchingService>(IDENTIFIER.MatchingService);

      return new MatchingMemberService(matchingService);
    },
  );

  DIContainer.bind<UuidGenerationService>(IDENTIFIER.UuidGenerationService).to(
    UuidGenerationService,
  );

  DIContainer.bind<MemberParticipationFactory>(
    IDENTIFIER.MemberParticipationFactory,
  ).toDynamicValue((context: interfaces.Context) => {
    const uuidGenerationService = context.container.get<UuidGenerationService>(
      IDENTIFIER.UuidGenerationService,
    );
    return new MemberParticipationFactory(uuidGenerationService);
  });

  DIContainer.bind<MemberFactory>(IDENTIFIER.MemberFactory).toDynamicValue(
    (context: interfaces.Context) => {
      const uuidGenerationService = context.container.get<UuidGenerationService>(
        IDENTIFIER.UuidGenerationService,
      );
      const DIFactoryMember = context.container.get<(option: IMember) => Member>(
        IDENTIFIER.DIFactoryMember,
      );
      const eventMemberRoleFactory = context.container.get<EventMemberRoleFactory>(
        IDENTIFIER.EventMemberRoleFactory,
      );

      return new MemberFactory(uuidGenerationService, eventMemberRoleFactory, DIFactoryMember);
    },
  );

  DIContainer.bind<EventMemberRoleFactory>(IDENTIFIER.EventMemberRoleFactory).toDynamicValue(
    (context: interfaces.Context) => {
      return new EventMemberRoleFactory();
    },
  );

  DIContainer.bind<(option: IMember) => Member>(IDENTIFIER.DIFactoryMember).toFactory<Member>(
    context => {
      return ({ id, name, eventMemberRole }: IMember) => {
        return new Member(id, name, eventMemberRole);
      };
    },
  );

  DIContainer.bind<HappeningFactory>(IDENTIFIER.HappeningFactory).toDynamicValue(
    (context: interfaces.Context) => {
      const uuidGenerationService = context.container.get<UuidGenerationService>(
        IDENTIFIER.UuidGenerationService,
      );

      return new HappeningFactory(uuidGenerationService);
    },
  );

  DIContainer.bind<HappeningRepository>(IDENTIFIER.HappeningRepository)
    .toDynamicValue((context: interfaces.Context) => {
      return new HappeningRepository();
    })
    .inSingletonScope();

  DIContainer.bind<MemberParticipationService>(
    IDENTIFIER.MemberParticipationService,
  ).toDynamicValue((context: interfaces.Context) => {
    const happeningService = context.container.get<HappeningService>(IDENTIFIER.HappeningService);
    const matchingMemberService = context.container.get<MatchingMemberService>(
      IDENTIFIER.MatchingMemberService,
    );
    const happeningFactory = context.container.get<HappeningFactory>(IDENTIFIER.HappeningFactory);

    const memberFactory = context.container.get<MemberFactory>(IDENTIFIER.MemberFactory);
    const memberParticipationRepository = context.container.get<MemberParticipationRepository>(
      IDENTIFIER.MemberParticipationRepository,
    );

    const memberParticipationFactory = context.container.get<MemberParticipationFactory>(
      IDENTIFIER.MemberParticipationFactory,
    );

    return new MemberParticipationService(
      happeningService,
      matchingMemberService,
      memberFactory,
      happeningFactory,
      memberParticipationRepository,
      memberParticipationFactory,
    );
  });

  DIContainer.bind<ParticipationHappeningApi>(IDENTIFIER.ParticipationHappeningApi).toDynamicValue(
    (context: interfaces.Context) => {
      const memberParticipationService = context.container.get<MemberParticipationService>(
        IDENTIFIER.MemberParticipationService,
      );

      return new ParticipationHappeningApi(memberParticipationService);
    },
  );

  DIContainer.bind<HappeningApi>(IDENTIFIER.HappeningApi).toDynamicValue(
    (context: interfaces.Context) => {
      const memberParticipationService = context.container.get<MemberParticipationService>(
        IDENTIFIER.MemberParticipationService,
      );

      return new HappeningApi(memberParticipationService);
    },
  );

  return DIContainer;
};

export { DIContainerProvider };
