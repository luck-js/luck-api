import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { GetPublishedHappenings } from './get-published-happenings';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('GetPublishedHappenings', function() {
  let getPublishedHappenings: GetPublishedHappenings;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    getPublishedHappenings = DIContainer.get<GetPublishedHappenings>(
      IDENTIFIER.GetPublishedHappenings,
    );
  });

  it('executed method return each stored published happenings', function(done) {
    getPublishedHappenings.execute().subscribe(publishedHappenings => {
      assert.ok(
        HAPPENING_INITIAL_LIST_MOCK.some(({ name }) =>
          publishedHappenings.some(publishedHappening => publishedHappening.name === name),
        ),
      );
      done();
    });
  });
});
