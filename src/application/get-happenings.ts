import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HappeningService } from '../domain/happening/happening.service';
import { Happening } from '../domain/happening/happening';

interface IParticipantsView {
  name: string;
}

interface IPublishedHappeningView {
  id: string;
  name: string;
  description: string;
  participants: IParticipantsView[];
}

@injectable()
export class GetHappenings {
  constructor(private happeningService: HappeningService) {}

  execute(): Observable<IPublishedHappeningView[]> {
    return this.happeningService
      .getAll()
      .pipe(map(happenings => happenings.map(mapToPublishedHappeningView)));
  }
}

function mapToPublishedHappeningView(happening: Happening): IPublishedHappeningView {
  const { name, description } = happening;
  const participants = happening
    .getMembers()
    .filter(member => member.eventMemberRole.abilityToRandom)
    .map(member => ({
      name: member.name,
    }));

  return {
    id: happening.id,
    name,
    description,
    participants,
  };
}
