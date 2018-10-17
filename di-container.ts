import "reflect-metadata";
import {Container, interfaces} from "inversify";
import IDENTIFIER from './identifiers';
import {RelationMemberHappeningRepository} from './relation-member-happening/relation-member-happening.repository';
import {MemberRepository} from './member/member.repository';
import {IMember} from './member/member.model';

const DIContainer = new Container();

DIContainer.bind<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository)
    .toDynamicValue((context: interfaces.Context) => {
        return new RelationMemberHappeningRepository(
            []
        )
    });

DIContainer.bind <(memberList: IMember[]) => MemberRepository>(IDENTIFIER.DIFactoryMemberRepository)
    .toFactory<MemberRepository>((context) => {
        return (memberList: IMember[]) => {

            return new MemberRepository(
                memberList);
        };
    });

export {DIContainer};