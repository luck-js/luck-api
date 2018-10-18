import 'mocha';
import { Container } from 'inversify';
import { Happening } from '../happening/happening';
import { HappeningFactory } from '../happening/happening.factory';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';

export const initialDependencies = (MEMBER_INITIAL_LIST_MOCK?, HAPPENING_INITIAL_LIST_MOCK?): Container => {
    return DIContainerProvider(MEMBER_INITIAL_LIST_MOCK, HAPPENING_INITIAL_LIST_MOCK);
};

export function createHappening(DIContainer: Container, { name, description, isPublish }: any): Happening {
    const happeningFactory = DIContainer.get<HappeningFactory>(IDENTIFIER.HappeningFactory);
    const id = happeningFactory.create();
    return happeningFactory.recreate({ id, name, description, isPublish });
}
