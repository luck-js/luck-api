import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import IDENTIFIER from './identifiers';
import { MemberParticipationRepository } from '../domain/member-participation/member-participation.repository';
import { MemberMongoRepository } from './mongo/member/member-mongo.repository';
import { HappeningMongoRepository } from './mongo/happening/happening-mongo.repository';
import { HappeningFactory } from '../domain/happening/happening.factory';
import { MatchingService } from '../domain/matching.service';
import { UuidGenerationService } from '../domain/member/uuid-generation.service';
import { MemberParticipationFactory } from '../domain/member-participation/member-participation.factory';
import { MemberFactory } from '../domain/member/member.factory';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { MatchingMemberService } from '../domain/matching-member.service';
import { EventMemberRoleFactory } from '../domain/member/event-member-role/event-member-role.factory';
import { HappeningService } from '../domain/happening/happening.service';
import { MemberService } from '../domain/member/member.service';
import { GetMemberParticipation } from '../application/get-member-participation';
import { GetMatchedMember } from '../application/matched-member';
import { MemberParticipationController } from '../interfaces/member-participation.controller';
import { CreateMemberParticipation } from '../application/create-member-participation';
import { UpdateHappeningMetadata } from '../application/update-happening-metadata';
import { AddParticipantMember } from '../application/add-participant-member';
import { PublishHappening } from '../application/publish-happening';
import { CreatePublishedHappening } from '../application/create-published-happening';
import { GetPublishedHappening } from '../application/get-published-happening';
import { IMemberRepository } from '../domain/member/member.repository';
import { IHappeningRepository } from '../domain/happening/happening.repository';

const DIContainer = new Container();

DIContainer.bind<MemberParticipationRepository>(IDENTIFIER.MemberParticipationRepository)
  .toDynamicValue((context: interfaces.Context) => {
    return new MemberParticipationRepository();
  })
  .inSingletonScope();

DIContainer.bind<IMemberRepository>(IDENTIFIER.MemberRepository)
  .toDynamicValue((context: interfaces.Context) => {
    return new MemberMongoRepository();
  })
  .inSingletonScope();

DIContainer.bind<MatchingService>(IDENTIFIER.MatchingService).to(MatchingService);

DIContainer.bind<MemberService>(IDENTIFIER.MemberService).toDynamicValue(
  (context: interfaces.Context) => {
    const memberRepository = context.container.get<MemberMongoRepository>(
      IDENTIFIER.MemberRepository,
    );
    const memberFactory = context.container.get<MemberFactory>(IDENTIFIER.MemberFactory);

    return new MemberService(memberRepository, memberFactory);
  },
);

DIContainer.bind<HappeningService>(IDENTIFIER.HappeningService).toDynamicValue(
  (context: interfaces.Context) => {
    const memberService = context.container.get<MemberService>(IDENTIFIER.MemberService);
    const happeningRepository = context.container.get<HappeningMongoRepository>(
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

DIContainer.bind<UuidGenerationService>(IDENTIFIER.UuidGenerationService).to(UuidGenerationService);

DIContainer.bind<MemberParticipationFactory>(IDENTIFIER.MemberParticipationFactory).toDynamicValue(
  (context: interfaces.Context) => {
    const uuidGenerationService = context.container.get<UuidGenerationService>(
      IDENTIFIER.UuidGenerationService,
    );
    return new MemberParticipationFactory(uuidGenerationService);
  },
);

DIContainer.bind<MemberFactory>(IDENTIFIER.MemberFactory).toDynamicValue(
  (context: interfaces.Context) => {
    const uuidGenerationService = context.container.get<UuidGenerationService>(
      IDENTIFIER.UuidGenerationService,
    );

    const eventMemberRoleFactory = context.container.get<EventMemberRoleFactory>(
      IDENTIFIER.EventMemberRoleFactory,
    );

    return new MemberFactory(uuidGenerationService, eventMemberRoleFactory);
  },
);

DIContainer.bind<EventMemberRoleFactory>(IDENTIFIER.EventMemberRoleFactory).toDynamicValue(
  (context: interfaces.Context) => {
    return new EventMemberRoleFactory();
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

DIContainer.bind<IHappeningRepository>(IDENTIFIER.HappeningRepository)
  .toDynamicValue((context: interfaces.Context) => {
    return new HappeningMongoRepository();
  })
  .inSingletonScope();

DIContainer.bind<MemberParticipationService>(IDENTIFIER.MemberParticipationService).toDynamicValue(
  (context: interfaces.Context) => {
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
  },
);

DIContainer.bind<GetMemberParticipation>(IDENTIFIER.GetMemberParticipation).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new GetMemberParticipation(memberParticipationService);
  },
);

DIContainer.bind<CreateMemberParticipation>(IDENTIFIER.CreateMemberParticipation).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new CreateMemberParticipation(memberParticipationService);
  },
);

DIContainer.bind<GetMatchedMember>(IDENTIFIER.GetMatchedMember).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new GetMatchedMember(memberParticipationService);
  },
);

DIContainer.bind<UpdateHappeningMetadata>(IDENTIFIER.UpdateHappeningMetadata).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new UpdateHappeningMetadata(memberParticipationService);
  },
);

DIContainer.bind<AddParticipantMember>(IDENTIFIER.AddParticipantMember).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new AddParticipantMember(memberParticipationService);
  },
);

DIContainer.bind<PublishHappening>(IDENTIFIER.PublishHappening).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new PublishHappening(memberParticipationService);
  },
);

DIContainer.bind<CreatePublishedHappening>(IDENTIFIER.CreatePublishedHappening).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new CreatePublishedHappening(memberParticipationService);
  },
);

DIContainer.bind<GetPublishedHappening>(IDENTIFIER.GetPublishedHappening).toDynamicValue(
  (context: interfaces.Context) => {
    const memberParticipationService = context.container.get<MemberParticipationService>(
      IDENTIFIER.MemberParticipationService,
    );

    return new GetPublishedHappening(memberParticipationService);
  },
);

DIContainer.bind<MemberParticipationController>(
  IDENTIFIER.MemberParticipationController,
).toDynamicValue((context: interfaces.Context) => {
  const createMemberParticipation = context.container.get<CreateMemberParticipation>(
    IDENTIFIER.CreateMemberParticipation,
  );
  const getMemberParticipation = context.container.get<GetMemberParticipation>(
    IDENTIFIER.GetMemberParticipation,
  );
  const memberParticipationService = context.container.get<GetMatchedMember>(
    IDENTIFIER.GetMatchedMember,
  );
  const updateHappeningMetadata = context.container.get<UpdateHappeningMetadata>(
    IDENTIFIER.UpdateHappeningMetadata,
  );

  const addParticipantMember = context.container.get<AddParticipantMember>(
    IDENTIFIER.AddParticipantMember,
  );
  const createPublishedHappening = context.container.get<CreatePublishedHappening>(
    IDENTIFIER.CreatePublishedHappening,
  );

  const getPublishedHappening = context.container.get<GetPublishedHappening>(
    IDENTIFIER.GetPublishedHappening,
  );

  const publishHappening = context.container.get<PublishHappening>(IDENTIFIER.PublishHappening);

  return new MemberParticipationController(
    createMemberParticipation,
    getMemberParticipation,
    memberParticipationService,
    updateHappeningMetadata,
    addParticipantMember,
    publishHappening,
    createPublishedHappening,
    getPublishedHappening,
  );
});

export { DIContainer };
