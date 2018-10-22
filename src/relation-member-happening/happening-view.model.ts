import { INewParticipantView } from './member-view.model';

export interface INewHappeningView {
    name: string;
    description: string;
    participantList: INewParticipantView[];
}

export interface IHappeningView {
    id: string,
    name: string,
    description: string,
    isPublish: boolean,
}
