export interface INewParticipantView {
    name: string;
}

export interface IMemberView {
    id: string,
    name: string,
}

export interface IMatchedParticipationData {
    me: IMemberView;
    matchedMember: IMemberView;
}
