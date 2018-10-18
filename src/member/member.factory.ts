import {inject, injectable} from 'inversify';
import IDENTIFIER from '../identifiers';
import {IMember} from './member.model';
import {Member} from './member';

@injectable()
export class MemberFactory {

    constructor(
        @inject(IDENTIFIER.DIFactoryMember) private DIFactoryMember: (id: string, relationId: string, name: string, uniqueLink: string, matchedMemberId: string) => Member){}

    public create(id, relationId, name):IMember{
        const uniqueLink = `www.luck.com/${relationId}`;

        return this.DIFactoryMember(id, relationId, name, uniqueLink, null)
    }
}