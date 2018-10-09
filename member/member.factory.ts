
import {IMember} from './member.model';

export class MemberFactory {

    constructor(){}

    create(id, relationId, name):IMember{
        const uniqueLink = `www.luck.com/${relationId}`;

        return {
            id,
            name,
            uniqueLink,
            matchedMemberId: null,
        }
    }
}