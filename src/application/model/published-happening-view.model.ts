export interface IPublishedHappeningView {
  name: string;
  description: string;
  participants: IParticipantsView[];
}

export interface IParticipantsView {
  name: string;
  uniqueLink: string;
}
