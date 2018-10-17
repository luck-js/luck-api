import "reflect-metadata";
import {Container, interfaces} from "inversify";
import IDENTIFIER from './identifiers';
import {RelationMemberHappeningRepository} from './relation-member-happening/relation-member-happening.repository';

const DIContainer = new Container();

DIContainer.bind<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository)
    .toDynamicValue((context: interfaces.Context) => {
        return new RelationMemberHappeningRepository(
            []
        )
    });

export {DIContainer};