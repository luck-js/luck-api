import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { map, switchMap } from 'rxjs/operators';
import { HappeningRepository } from '../happening/happening.repository';
import { HappeningFactory } from '../happening/happening.factory';
import { Observable } from 'rxjs';

@injectable()
export class RelationMemberHappeningFactory {
  constructor(
    private happeningRepository: HappeningRepository,
    private happeningFactory: HappeningFactory,
    private uuidGenerationService: UuidGenerationService,
    @inject(IDENTIFIER.DIFactoryRelationMemberHappening)
    private DIFactoryRelationMemberHappening: (
      option: IRelationMemberHappening,
    ) => RelationMemberHappening,
  ) {}

  public create(): Observable<RelationMemberHappening> {
    const id = this.uuidGenerationService.createNewUuid();
    const happening = this.happeningFactory.create();
    const happeningId = happening.id;

    return happening.createMember(RoleType.ORGANISER).pipe(
      switchMap(() => this.happeningRepository.add(happening)),
      map(member =>
        this.DIFactoryRelationMemberHappening({ id, happeningId, memberId: member.id }),
      ),
    );
  }

  public recreate(option: IRelationMemberHappening): RelationMemberHappening {
    return this.DIFactoryRelationMemberHappening(option);
  }
}
