import 'mocha';
import { Container } from 'inversify';
import { Happening } from '../happening/happening';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';

export const initialDependencies = (MEMBER_INITIAL_LIST_MOCK?, HAPPENING_INITIAL_LIST_MOCK?): Container => {
    return DIContainerProvider(MEMBER_INITIAL_LIST_MOCK, HAPPENING_INITIAL_LIST_MOCK);
};

export function createHappening(DIContainer: Container, { name, description }: any): Happening {
    const relationMemberHappeningService = DIContainer.get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);
    const relationId = relationMemberHappeningService.createHappening();
    return relationMemberHappeningService.editHappening(relationId, { name, description });
}
