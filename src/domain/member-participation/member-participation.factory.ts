import { inject, injectable } from 'inversify';
import IDENTIFIER from '../../identifiers';
import { IMemberParticipation } from './member-participation.model';
import { MemberParticipation } from './member-participation';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { map, switchMap } from 'rxjs/operators';
import { HappeningRepository } from '../happening/happening.repository';
import { HappeningFactory } from '../happening/happening.factory';
import { Observable } from 'rxjs';

@injectable()
export class MemberParticipationFactory {
  constructor(
    private happeningRepository: HappeningRepository,
    private happeningFactory: HappeningFactory,
    private uuidGenerationService: UuidGenerationService,
    @inject(IDENTIFIER.DIFactoryMemberParticipation)
    private DIFactoryMemberParticipation: (option: IMemberParticipation) => MemberParticipation,
  ) {}

  public create(): Observable<MemberParticipation> {
    const id = this.uuidGenerationService.createNewUuid();
    const happening = this.happeningFactory.create();
    const happeningId = happening.id;

    return happening.createMember(RoleType.ORGANISER).pipe(
      switchMap(() => this.happeningRepository.add(happening)),
      map(member => this.DIFactoryMemberParticipation({ id, happeningId, memberId: member.id })),
    );
  }

  public recreate(option: IMemberParticipation): MemberParticipation {
    return this.DIFactoryMemberParticipation(option);
  }
}
