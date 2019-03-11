const IDENTIFIER = {
  MemberParticipationRepository: Symbol.for('MemberParticipationRepository'),
  MemberRepository: Symbol.for('MemberMongoRepository'),
  HappeningRepository: Symbol.for('HappeningMongoRepository'),

  MemberService: Symbol.for('MemberService'),
  HappeningService: Symbol.for('HappeningService'),
  MatchingService: Symbol.for('MatchingService'),
  MatchingMemberService: Symbol.for('MatchingMemberService'),
  UuidGenerationService: Symbol.for('UuidGenerationService'),

  MemberParticipationFactory: Symbol.for('MemberParticipationFactory'),
  EventMemberRoleFactory: Symbol.for('EventMemberRoleFactory'),
  MemberFactory: Symbol.for('MemberFactory'),
  HappeningFactory: Symbol.for('HappeningFactory'),

  MemberParticipationService: Symbol.for('MemberParticipationService'),
  CreateMemberParticipation: Symbol.for('CreateMemberParticipation'),
  GetMemberParticipation: Symbol.for('GetMemberParticipation'),
  GetMatchedMember: Symbol.for('GetMatchedMember'),
  UpdateHappeningMetadata: Symbol.for('UpdateHappeningMetadata'),
  AddParticipantMember: Symbol.for('AddParticipantMember'),
  PublishHappening: Symbol.for('PublishHappening'),
  CreatePublishedHappening: Symbol.for('CreatePublishedHappening'),
  GetPublishedHappening: Symbol.for('GetPublishedHappening'),

  MemberParticipationController: Symbol.for('MemberParticipationController'),
};

export default IDENTIFIER;
