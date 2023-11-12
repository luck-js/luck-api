import { injectable } from 'inversify';
import { IMemberParticipationRepository } from './member-participation.repository';
import { IMemberParticipation } from './member-participation.model';

@injectable()
export class MemberParticipationMockRepository implements IMemberParticipationRepository {
  constructor(private list: IMemberParticipation[] = []) {}

  add(memberParticipation: IMemberParticipation): Promise<IMemberParticipation> {
    this.list.push(memberParticipation);
    return Promise.resolve(memberParticipation);
  }

  getByIndex(id: string): Promise<IMemberParticipation> {
    return Promise.resolve(this.list.find(memberParticipation => memberParticipation.id === id));
  }

  update(memberParticipation: IMemberParticipation): Promise<IMemberParticipation> {
    this.list = this.list.reduce((state, prevMemberParticipation) => {
      prevMemberParticipation =
        prevMemberParticipation.id !== memberParticipation.id
          ? prevMemberParticipation
          : { ...prevMemberParticipation, ...memberParticipation };
      state.push(prevMemberParticipation);
      return state;
    }, []);

    return Promise.resolve(memberParticipation);
  }

  getAllByHappeningIndex(happeningId: string): Promise<IMemberParticipation[]> {
    return Promise.resolve(
      this.list.filter(memberParticipation => memberParticipation.happeningId === happeningId),
    );
  }
}
