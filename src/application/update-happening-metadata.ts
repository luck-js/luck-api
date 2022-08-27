import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { Happening } from '../domain/happening/happening';
import { IHappeningView } from './model/happening-view.model';
import { IHappeningMetadata } from '../domain/happening/happening.model';

@injectable()
export class UpdateHappeningMetadata {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  async execute(id: string, happeningMetadata: IHappeningMetadata): Promise<IHappeningView> {
    if (
      typeof happeningMetadata.name === 'undefined' ||
      typeof happeningMetadata.description === 'undefined'
    ) {
      throw new Error('happeningMetadata is not complete');
    }
    const memberParticipation = await this.relationMemberHappeningService.updateHappeningMetadata(
      id,
      happeningMetadata,
    );
    return mapToHappeningView(memberParticipation.happening);
  }
}

function mapToHappeningView({ id, name, isPublish, description }: Happening): IHappeningView {
  return { id, name, isPublish, description };
}
