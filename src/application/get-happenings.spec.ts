import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { GetHappenings } from './get-happenings';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('GetHappenings', function() {
  let getHappenings: GetHappenings;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    getHappenings = DIContainer.get<GetHappenings>(IDENTIFIER.GetHappenings);
  });

  it('executed method return each stored published happenings', function(done) {
    getHappenings.execute().subscribe(publishedHappenings => {
      assert.ok(
        HAPPENING_INITIAL_LIST_MOCK.some(({ name }) =>
          publishedHappenings.some(publishedHappening => publishedHappening.name === name),
        ),
      );
      done();
    });
  });
});
