export interface IPublishedHappeningView {
  name: string;
  description: string;
  participants: IParticipantsView[];
}

export interface IParticipantsView {
  name: string;
  uniqueLink: string;
}

export interface INewPublishedHappeningView {
  name: string;
  description: string;
  participants: INewParticipantView[];
}

export interface INewParticipantView {
  name: string;
}
