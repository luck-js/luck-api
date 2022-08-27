import { injectable } from 'inversify';
import { INewPublishedHappeningView } from './model/published-happening-view.model';
import { IPublishedHappeningView } from './model/published-happening-view.model';
import { CreatePublishedHappening } from './create-published-happening';
import { CreateMemberParticipation } from './create-member-participation';

interface IPublishedHappeningView2 extends IPublishedHappeningView {
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
    const id = await this.createMemberParticipation.execute();
    const publishedHappeningView = await this.createPublishedHappening.execute(
      id,
      newPublishedHappeningView,
    );
    return { id, ...publishedHappeningView };
  }
}
