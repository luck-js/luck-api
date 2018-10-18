import {IMember} from './member.model';

export class Member implements IMember {

    constructor(
        public id: string,
        public relationId: string,
        public name: string,
        public uniqueLink: string,
        public matchedMemberId: string
    ) {

    }
}
