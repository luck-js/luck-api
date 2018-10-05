import {IMember} from './member.model';

export class MatchingMemberService {

    public randomMembers(membersList: IMember[]): IMember[] {

        return membersList.reduce((matchedMembersList, member, index) => {
            const idsMemberToRandom = matchedMembersList
                .reduce((previousState, matchedMember) => {
                    return previousState
                        .filter((el) => el.id !== member.id)
                        .filter((el) => el.id !== matchedMember.matchedMemberId);

                }, membersList)
                .map((el) => el.id);

            let idMemberRandom;
            const lastMember = membersList[index + 1] && membersList[index + 1];
            if (lastMember && idsMemberToRandom.length < 2 && idsMemberToRandom.some((id) => lastMember.id === id)) {
                idMemberRandom = lastMember.id;
            } else {
                idMemberRandom = idsMemberToRandom[Math.floor(Math.random() * idsMemberToRandom.length)];
            }

            // @ts-ignore
            matchedMembersList.push(Object.assign(member, {matchedMemberId: idMemberRandom}));

            return matchedMembersList;
        }, []);
    }

}