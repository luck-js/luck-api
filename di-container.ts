import "reflect-metadata";
import {Container, interfaces} from "inversify";
import IDENTIFIER from './identifiers';
import {RelationMemberHappeningRepository} from './relation-member-happening/relation-member-happening.repository';
import {MemberRepository} from './member/member.repository';
import {HappeningRepository} from './happening/happening.repository';
import {IHappening} from './happening/happening.model';
import {HappeningFactory} from './happening/happening.factory';
import {MatchingMemberService} from './member/matching-member.service';
import {UuidGenerationService} from './member/uuid-generation.service';
import {RelationMemberHappeningFactory} from './relation-member-happening/relation-member-happening.factory';

const DIContainerProvider = (MEMBER_INITIAL_LIST_MOCK?) : Container => {
    const DIContainer = new Container();


    DIContainer.bind<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository)
        .toDynamicValue((context: interfaces.Context) => {
            return new RelationMemberHappeningRepository(
                []
            )
        });

    DIContainer.bind<MemberRepository>(IDENTIFIER.MemberRepository)
        .toDynamicValue((context: interfaces.Context) => {
            return new MemberRepository(
                MEMBER_INITIAL_LIST_MOCK
            )
        });

    DIContainer.bind <(happeningList: IHappening[], happeningFactory: HappeningFactory) => HappeningRepository>(IDENTIFIER.DIFactoryHappeningRepository)
        .toFactory<HappeningRepository>((context) => {
            return (happeningList: IHappening[], happeningFactory: HappeningFactory) => {

                return new HappeningRepository(
                    happeningList,
                    happeningFactory);
            };
        });

    DIContainer.bind<MatchingMemberService>(IDENTIFIER.MatchingMemberService).to(MatchingMemberService);
    DIContainer.bind<UuidGenerationService>(IDENTIFIER.UuidGenerationService).to(UuidGenerationService);
    DIContainer.bind<RelationMemberHappeningFactory>(IDENTIFIER.RelationMemberHappeningFactory).to(RelationMemberHappeningFactory);

    return DIContainer;
};

export {DIContainerProvider};