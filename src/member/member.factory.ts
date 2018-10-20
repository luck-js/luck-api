import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IMember } from './member.model';
import { Member } from './member';
import { UuidGenerationService } from './uuid-generation.service';

@injectable()
export class MemberFactory {

    constructor(
        private uuidGenerationService: UuidGenerationService,
        @inject(IDENTIFIER.DIFactoryMember) private DIFactoryMember: (option: IMember) => Member) {}

    public create(relationId: string, name?: string): Member {
        const id = this.uuidGenerationService.createNewUuid();
        const uniqueLink = `www.luck.com/${relationId}`;
        const matchedMemberId = null;

        return this.DIFactoryMember({ id, relationId, name, uniqueLink, matchedMemberId })
    }

    public recreate(option: IMember): Member {
        return this.DIFactoryMember(option);
    }
}
