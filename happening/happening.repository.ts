import {IHappening} from './happening.model';


export class HappeningRepository {

    constructor(private list: IHappening[] = []) {
    }

    public add(happening: IHappening): IHappening {
        this.list.push(happening);

        return happening
    }

    public getByIndex(id: string): IHappening {
        // @ts-ignore
        return this.list.find((el) => el.id === id)
    }
}
