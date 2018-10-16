import {IHappening} from './happening.model';
import {Happening} from './happening';
import {HappeningFactory} from './happening.factory';


export class HappeningRepository {

    constructor(private list: IHappening[] = [],
                private happeningFactory: HappeningFactory) {
    }

    public add(happening: IHappening): IHappening {
        this.list.push(happening);

        return happening
    }

    public getByIndex(id: string): Happening {
        // @ts-ignore
        const happening = this.list.find((el) => el.id === id);
        return this.happeningFactory.recreate(happening);
    }
}
