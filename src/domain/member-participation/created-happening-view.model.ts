export interface ICreatedHappeningView {
  name: string;
  description: string;
  participants: IParticipantsView[];
}

export interface IParticipantsView {
  name: string;
  uniqueLink: string;
}
