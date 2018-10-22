import { injectable } from 'inversify';
import { IMember } from './member.model';
import { Member } from './member';
import { MemberFactory } from './member.factory';

@injectable()
export class MemberRepository {

    constructor(private list: IMember[] = [],
                private memberFactory: MemberFactory) {
    }

    public add(member: IMember): IMember {
        this.list.push(member);

        return member
    }

    public getByIndex(id: string): Member {
        const member = this.list.find((el) => el.id === id);

        if (!member) {
            throw Error('id isn\' correct')
        } else {
            return this.memberFactory.recreate(member);
        }
    }

    public getList(): Member[] {
        return this.list.map((member) => this.memberFactory.recreate(member));
    }

    public updateList(memberList: IMember[]) {
        this.list = this.list.reduce((previousValue, currentValue) => {
            const member = memberList.find((el) => el.id === currentValue.id);
            member ? previousValue.push(member) : previousValue.push(currentValue);

            return previousValue;
        }, []);
    }
}
