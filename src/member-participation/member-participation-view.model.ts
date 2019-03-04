import { IMemberView } from './member-view.model';
import { IHappeningView } from './happening-view.model';

export interface IMemberParticipationView {
  member: IMemberView;
  happening: IHappeningView;
}
