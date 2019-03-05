export interface INewParticipantView {
  name: string;
}

export interface IMemberView {
  id: string;
  name: string;
}

export interface IMatchedMemberView {
  me: IMemberView;
  matchedMember: IMemberView;
}
