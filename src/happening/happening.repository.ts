import { injectable } from 'inversify';
import HappeningModel, { IHappening } from './happening.model';
import { Happening } from './happening';
import { HappeningFactory } from './happening.factory';

@injectable()
export class HappeningRepository {

    constructor(private list: IHappening[] = [],
                private happeningFactory: HappeningFactory) {
    }

    public add({ id, name, description, isPublish, memberIdList }: IHappening): Promise<IHappening> {
        return new HappeningModel({ id, name, description, isPublish, memberIdList }).save();
    }

    public getByIndex(id: string): Promise<Happening> {
        return HappeningModel.findOne({ id: id }, null, { limit: 1 })
            .then((happening) => this.happeningFactory.recreate(happening));
    }

    public update(id: string, option: IHappening): Promise<Happening> {
        return HappeningModel.findOneAndUpdate({ id }, option, { new: true })
            .then((happening) => this.happeningFactory.recreate(happening));
    }
}
