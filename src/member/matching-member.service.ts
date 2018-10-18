import { injectable } from 'inversify';
import { IMember } from './member.model';

@injectable()
export class MatchingMemberService {

    public randomMembers(membersList: IMember[]): IMember[] {

        return membersList.reduce((matchedMembersList, member, index) => {
            let idMemberRandom;

            const idsMemberToRandom = pullOutIdsToRandom(matchedMembersList, membersList, member.id);
            const preLastMemberIndex = membersList.length - 2;

            if (preLastMemberIndex === index && isChanceOfConflict(idsMemberToRandom, membersList[membersList.length - 1].id)) {
                idMemberRandom = membersList[membersList.length - 1].id

            } else {
                idMemberRandom = randomMemberId(idsMemberToRandom);

            }

            matchedMembersList.push(Object.assign({}, member, { matchedMemberId: idMemberRandom }));

            return matchedMembersList;
        }, []);
    }

}

function randomMemberId(idsMemberToRandom) {
    return idsMemberToRandom[Math.floor(Math.random() * idsMemberToRandom.length)];
}

function isChanceOfConflict(idsMemberToRandom, lastMemberId) {
    return idsMemberToRandom.some((id) => id === lastMemberId);
}

function pullOutIdsToRandom(matchedMembersList, membersList, currentMemberId) {
    return matchedMembersList
        .reduce((previousState, matchedMember) => {
            return previousState
                .filter((el) => el.id !== matchedMember.matchedMemberId)

        }, membersList)
        .map((el) => el.id)
        .filter((id) => id !== currentMemberId)
}
