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
import {Happening} from './happening/happening';
import {Member} from './member/member';
import {RelationMemberHappeningService} from './relation-member-happening/relation-member-happening.service';
import {RelationMemberHappeningApi} from './relation-member-happening/relation-member-happening.api';

const DIContainerProvider = (MEMBER_INITIAL_LIST_MOCK?, HAPPENING_INITIAL_LIST_MOCK?): Container => {
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

    DIContainer.bind <(id: string, name: string, description: string, isPublish: boolean) => Happening>(IDENTIFIER.DIFactoryHappening)
        .toFactory<Happening>((context) => {
            return (id: string, name: string, description: string, isPublish: boolean) => {
                const memberRepository = context.container.get<MemberRepository>(IDENTIFIER.MemberRepository);
                const relationMemberHappeningRepository = context.container.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
                const matchingMemberService = context.container.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
                const uuidGenerationService = context.container.get<UuidGenerationService>(IDENTIFIER.UuidGenerationService);
                const relationMemberHappeningFactory = context.container.get<RelationMemberHappeningFactory>(IDENTIFIER.RelationMemberHappeningFactory);
                const memberFactory = context.container.get<MemberFactory>(IDENTIFIER.MemberFactory);

                return new Happening(
                    id,
                    name,
                    description,
                    isPublish,
                    memberRepository,
                    relationMemberHappeningRepository,
                    matchingMemberService,
                    uuidGenerationService,
                    relationMemberHappeningFactory,
                    memberFactory);
            };
        });

    DIContainer.bind <(id: string, relationId: string, name: string, uniqueLink: string, matchedMemberId: string) => Member>(IDENTIFIER.DIFactoryMember)
        .toFactory<Member>((context) => {
            return (id: string, relationId: string, name: string, uniqueLink: string, matchedMemberId: string) => {

                return new Member(
                    id,
                    relationId,
                    name,
                    uniqueLink,
                    matchedMemberId);
            };
        });

    DIContainer.bind<HappeningFactory>(IDENTIFIER.HappeningFactory)
        .toDynamicValue((context: interfaces.Context) => {
            const uuidGenerationService = context.container.get<UuidGenerationService>(IDENTIFIER.UuidGenerationService);
            const DIFactoryHappening = context.container.get<(id: string, name: string, description: string, isPublish: boolean) => Happening>(IDENTIFIER.DIFactoryHappening);

            return new HappeningFactory(
                uuidGenerationService,
                DIFactoryHappening
            )
        });

    DIContainer.bind<HappeningRepository>(IDENTIFIER.HappeningRepository)
        .toDynamicValue((context: interfaces.Context) => {
            const happeningFactory = context.container.get<HappeningFactory>(IDENTIFIER.HappeningFactory);

            return new HappeningRepository(
                HAPPENING_INITIAL_LIST_MOCK,
                happeningFactory);
        }).inSingletonScope();

    DIContainer.bind<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService)
        .toDynamicValue((context: interfaces.Context) => {
            const relationMemberHappeningRepository = context.container.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
            const memberRepository = context.container.get<MemberRepository>(IDENTIFIER.MemberRepository);
            const happeningRepository = context.container.get<HappeningRepository>(IDENTIFIER.HappeningRepository);

            return new RelationMemberHappeningService(
                relationMemberHappeningRepository,
                memberRepository,
                happeningRepository);
        });

    DIContainer.bind<RelationMemberHappeningApi>(IDENTIFIER.RelationMemberHappeningApi)
        .toDynamicValue((context: interfaces.Context) => {
            const relationMemberHappeningService = context.container.get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);

            return new RelationMemberHappeningApi(relationMemberHappeningService);
        });

    return DIContainer;
};

export {DIContainerProvider};