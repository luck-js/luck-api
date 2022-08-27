import { injectable } from 'inversify';
import { MemberParticipationFactory } from './member-participation.factory';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';
import { MemberParticipation } from './member-participation';
import { IHappeningMetadata } from '../happening/happening.model';
import { HappeningService } from '../happening/happening.service';
import { IMemberParticipation } from './member-participation.model';
import { MemberFactory } from '../member/member.factory';
import { HappeningFactory } from '../happening/happening.factory';
import { MatchingMemberService } from '../matching-member.service';
import { IMemberParticipationRepository } from './member-participation.repository';

@injectable()
export class MemberParticipationService {
  constructor(
    private happeningService: HappeningService,
    private matchingMemberService: MatchingMemberService,
    private memberFactory: MemberFactory,
    private happeningFactory: HappeningFactory,
    private memberParticipationRepository: IMemberParticipationRepository,
    private memberParticipationFactory: MemberParticipationFactory,
  ) {}

  async create(): Promise<MemberParticipation> {
    const happening = this.happeningFactory.create();
    const member = happening.addMember(this.memberFactory.create(RoleType.ORGANISER));
    const memberParticipation = this.memberParticipationFactory.create(member, happening);

    await this.happeningService.add(memberParticipation.happening).toPromise();
    return this.add(memberParticipation);
  }

  async add(memberParticipation: MemberParticipation): Promise<MemberParticipation> {
    await this.memberParticipationRepository.add(mapToEntity(memberParticipation));
    return memberParticipation;
  }

  async update(memberParticipation: MemberParticipation): Promise<MemberParticipation> {
    await this.memberParticipationRepository.update(mapToEntity(memberParticipation));
    return memberParticipation;
  }

  async get(id: string): Promise<MemberParticipation> {
    const memberParticipation = await this.memberParticipationRepository.getByIndex(id);
    const happening = await this.happeningService.get(memberParticipation.happeningId).toPromise();

    const recreateMemberParticipation = (memberParticipation, happening) => {
      const id = memberParticipation.id;
      const member = happening.getMember(memberParticipation.memberId);
      return this.memberParticipationFactory.recreate(id, member, happening);
    };

    return recreateMemberParticipation(memberParticipation, happening);
  }

  async getListById(id: string): Promise<MemberParticipation[]> {
    const memberParticipation = await this.memberParticipationRepository.getByIndex(id);
    const memberParticipations = await this.memberParticipationRepository.getAllByHappeningIndex(
      memberParticipation.happeningId,
    );

    const list = [];

    for await (const memberParticipation of memberParticipations) {
      const item = await this.get(memberParticipation.id);
      list.push(item);
    }

    return list;
  }

  async updateHappeningMetadata(
    id: string,
    happeningMetadata: IHappeningMetadata,
  ): Promise<MemberParticipation> {
    const memberParticipation = await this.get(id);
    memberParticipation.updateHappeningMetadata(happeningMetadata);
    await this.happeningService.update(memberParticipation.happening).toPromise();

    return memberParticipation;
  }

  async publishHappening(id: string): Promise<void> {
    const matchMember = (members: Member[]) => {
      return this.matchingMemberService.matchMembers(members);
    };

    const memberParticipation = await this.get(id);

    memberParticipation.updateMembers(matchMember(memberParticipation.happening.getMembers()));
    memberParticipation.publishHappening();
    await this.happeningService.update(memberParticipation.happening).toPromise();
  }

  async addParticipantMember(id: string, name: string): Promise<Member> {
    const createMemberParticipation = happening => {
      const participantMember = happening.addMember(
        this.memberFactory.create(RoleType.PARTICIPANT, name),
      );

      return this.memberParticipationFactory.create(participantMember, happening);
    };

    const memberParticipation = await this.get(id);

    const newMemberParticipation = createMemberParticipation(memberParticipation.happening);

    await this.happeningService.update(memberParticipation.happening).toPromise();
    await this.add(newMemberParticipation);
    return newMemberParticipation.getMember();
  }

  async addParticipantMembers(id: string, participants: { name: string }[]): Promise<Member[]> {
    const createMemberParticipation = (happening, name) => {
      const participantMember = happening.addMember(
        this.memberFactory.create(RoleType.PARTICIPANT, name),
      );

      return this.memberParticipationFactory.create(participantMember, happening);
    };

    const memberParticipation = await this.get(id);

    const memberParticipations = participants.map(({ name }) =>
      createMemberParticipation(memberParticipation.happening, name),
    );
    await this.happeningService.update(memberParticipation.happening).toPromise();

    const list = [];

    for await (const memberParticipation of memberParticipations) {
      const item = await this.add(memberParticipation);
      list.push(item);
    }

    return memberParticipations[0].getMembers();
  }
}

function mapToEntity({ id, member, happening }: MemberParticipation): IMemberParticipation {
  return {
    id,
    memberId: member.id,
    happeningId: happening.id,
  };
}
