export interface ICreatedHappening {
    name: string;
    description: string;
    participantList: IParticipantUniqueLinkData[];
}

export interface IParticipantUniqueLinkData {
    name: string,
    uniqueLink: string,
}
