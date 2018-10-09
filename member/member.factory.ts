import {UuidGenerationService} from './uuid-generation.service';
import {IMember} from './member.model';

export class MemberFactory {

    constructor(private uuidGenerationService: UuidGenerationService){}

    create(idHappening, name):IMember{
        const id = this.uuidGenerationService.createNewUuid();
        const uniqueLink = this.uuidGenerationService.createNewUuidFromArguments([idHappening, id]);

        return {
            id,
            name,
            uniqueLink,
            matchedMemberId: null,
        }
    }
}