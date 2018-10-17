import {injectable} from 'inversify';
import {IMember} from './member.model';
import {Member} from './member';

@injectable()
export class MemberFactory {

    constructor(){}

    create(id, relationId, name):IMember{
        const uniqueLink = `www.luck.com/${relationId}`;

        return new Member(
            id,
            relationId,
            name,
            uniqueLink,
            null,)
    }
}