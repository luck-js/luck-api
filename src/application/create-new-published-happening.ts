import { injectable } from 'inversify';
import { INewPublishedHappeningView } from './model/published-happening-view.model';
import { CreatePublishedHappening } from './create-published-happening';
import { CreateMemberParticipation } from './create-member-participation';

interface IPublishedHappeningView2 {
  id: string;
}

@injectable()
export class CreateNewPublishedHappening {
  constructor(
    private createPublishedHappening: CreatePublishedHappening,
    private createMemberParticipation: CreateMemberParticipation,
  ) {}

  async execute(
    newPublishedHappeningView: INewPublishedHappeningView,
  ): Promise<IPublishedHappeningView2> {
    const id = this.createNewUuid();
    (async () => {
      await this.createMemberParticipation.execute(id);
      await this.createPublishedHappening.execute(
        id,
        newPublishedHappeningView,
      );
    })()
    return { id }
  }

  private createNewUuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
