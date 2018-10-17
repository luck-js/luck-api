import {injectable} from 'inversify';
import {Happening} from './happening';
import {MemberRepository} from '../member/member.repository';
import {RelationMemberHappeningRepository} from '../relation-member-happening/relation-member-happening.repository';
import {MatchingMemberService} from '../member/matching-member.service';
import {UuidGenerationService} from '../member/uuid-generation.service';
import {RelationMemberHappeningFactory} from '../relation-member-happening/relation-member-happening.factory';
import {MemberFactory} from '../member/member.factory';
import {IHappening} from './happening.model';

@injectable()
export class HappeningFactory {
    constructor(
        public memberRepository: MemberRepository,
        public relationMemberHappeningRepository: RelationMemberHappeningRepository,
        public matchingMemberService: MatchingMemberService,
        public uuidGenerationService: UuidGenerationService,
        public relationMemberHappeningFactory: RelationMemberHappeningFactory,
        public memberFactory: MemberFactory) {
    }

    public create(): string {
        return this.uuidGenerationService.createNewUuid();
    }

    public recreate({id, name, description, isPublish}: IHappening): Happening {
        return new Happening(
            id,
            name,
            description,
            isPublish,
            this.memberRepository,
            this.relationMemberHappeningRepository,
            this.matchingMemberService,
            this.uuidGenerationService,
            this.relationMemberHappeningFactory,
            this.memberFactory
        )
    }
}
