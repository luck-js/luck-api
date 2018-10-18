import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IMember } from './member.model';
import { Member } from './member';

@injectable()
export class MemberFactory {

    constructor(
        @inject(IDENTIFIER.DIFactoryMember) private DIFactoryMember: (option: IMember) => Member) {}

    public create(id: string, relationId: string, name: string): IMember {
        const uniqueLink = `www.luck.com/${relationId}`;
        const matchedMemberId = null;

        return this.DIFactoryMember({ id, relationId, name, uniqueLink, matchedMemberId })
    }
}
