import { INewParticipantView } from './member-view.model';

export interface INewHappeningView {
  name: string;
  description: string;
  participants: INewParticipantView[];
}
