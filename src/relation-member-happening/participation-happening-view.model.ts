import { IMemberView } from './member-view.model';
import { IHappeningView } from './happening-view.model';

export interface IParticipationHappeningView {
  member: IMemberView;
  happening: IHappeningView;
}
