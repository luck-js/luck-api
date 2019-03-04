import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { UuidGenerationService } from '../member/uuid-generation.service';

@injectable()
export class RelationMemberHappeningFactory {
  constructor(
    private uuidGenerationService: UuidGenerationService,
    @inject(IDENTIFIER.DIFactoryRelationMemberHappening)
    private DIFactoryRelationMemberHappening: (
      option: IRelationMemberHappening,
    ) => RelationMemberHappening,
  ) {}

  public create(memberId: string, happeningId: string): RelationMemberHappening {
    const id = this.uuidGenerationService.createNewUuid();
    return this.DIFactoryRelationMemberHappening({ id, memberId, happeningId });
  }

  public recreate(option: IRelationMemberHappening): RelationMemberHappening {
    return this.DIFactoryRelationMemberHappening(option);
  }
}
