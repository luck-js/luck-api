const IDENTIFIER = {
  MemberParticipationRepository: Symbol.for('MemberParticipationRepository'),
  MemberRepository: Symbol.for('MemberRepository'),
  HappeningRepository: Symbol.for('HappeningRepository'),

  DIFactoryHappening: Symbol.for('DIFactoryHappening'),
  DIFactoryMember: Symbol.for('DIFactoryMember'),
  DIFactoryMemberParticipation: Symbol.for('DIFactoryMemberParticipation'),

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
  ParticipationHappeningApi: Symbol.for('ParticipationHappeningApi'),
  HappeningApi: Symbol.for('HappeningApi'),
};

export default IDENTIFIER;
