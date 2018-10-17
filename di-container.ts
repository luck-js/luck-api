import "reflect-metadata";
import {Container, interfaces} from "inversify";
import IDENTIFIER from './identifiers';
import {RelationMemberHappeningRepository} from './relation-member-happening/relation-member-happening.repository';
import {MemberRepository} from './member/member.repository';
import {HappeningRepository} from './happening/happening.repository';
import {HappeningFactory} from './happening/happening.factory';
import {MatchingMemberService} from './member/matching-member.service';
import {UuidGenerationService} from './member/uuid-generation.service';
import {RelationMemberHappeningFactory} from './relation-member-happening/relation-member-happening.factory';
import {MemberFactory} from './member/member.factory';

const DIContainerProvider = (MEMBER_INITIAL_LIST_MOCK?, HAPPENING_INITIAL_LIST_MOCK?) : Container => {
    const DIContainer = new Container();


    DIContainer.bind<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository)
        .toConstantValue(new RelationMemberHappeningRepository(
                [])
        );

    DIContainer.bind<MemberRepository>(IDENTIFIER.MemberRepository)
        .toConstantValue(new MemberRepository(
                MEMBER_INITIAL_LIST_MOCK
            ));

    DIContainer.bind<MatchingMemberService>(IDENTIFIER.MatchingMemberService).to(MatchingMemberService);
    DIContainer.bind<UuidGenerationService>(IDENTIFIER.UuidGenerationService).to(UuidGenerationService);
    DIContainer.bind<RelationMemberHappeningFactory>(IDENTIFIER.RelationMemberHappeningFactory).to(RelationMemberHappeningFactory);
    DIContainer.bind<MemberFactory>(IDENTIFIER.MemberFactory).to(MemberFactory);

    DIContainer.bind<HappeningFactory>(IDENTIFIER.HappeningFactory)
        .toDynamicValue((context: interfaces.Context) => {
            const memberRepository = context.container.get<MemberRepository>(IDENTIFIER.MemberRepository);
            const relationMemberHappeningRepository = context.container.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
            const matchingMemberService = context.container.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
            const uuidGenerationService = context.container.get<UuidGenerationService>(IDENTIFIER.UuidGenerationService);
            const relationMemberHappeningFactory = context.container.get<RelationMemberHappeningFactory>(IDENTIFIER.RelationMemberHappeningFactory);
            const memberFactory = context.container.get<MemberFactory>(IDENTIFIER.MemberFactory);

            return new HappeningFactory(
                memberRepository,
                relationMemberHappeningRepository,
                matchingMemberService,
                uuidGenerationService,
                relationMemberHappeningFactory,
                memberFactory
            )
        });

    DIContainer.bind<HappeningRepository>(IDENTIFIER.HappeningRepository)
        .toDynamicValue((context: interfaces.Context) => {
                const happeningFactory = context.container.get<HappeningFactory>(IDENTIFIER.HappeningFactory);

                return new HappeningRepository(
                    HAPPENING_INITIAL_LIST_MOCK,
                    happeningFactory);
        });

    return DIContainer;
};

export {DIContainerProvider};