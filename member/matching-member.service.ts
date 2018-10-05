import {IMember} from './member.model';

export class MatchingMemberService {

    public randomMembers(membersList: IMember[]): IMember[] {
        const idListToRandom = membersList.reduce((prevState, member) => {
            prevState.push(member.id);
            return prevState
        }, []);

        return idListToRandom.reduce((prevState, id, index) => {
            const memberRandom = randomFromRangeUntilTrue(
                (random) => {
                    return prevState[index].id === random.id
                        || prevState.some((member) => member.matchedMemberId === random.id)
                },
                () => membersList[Math.floor(Math.random() * idListToRandom.length)]
            );

            prevState[index].matchedMemberId = memberRandom.id;

            return prevState;
        }, membersList)
    }

}

function randomFromRangeUntilTrue(conditionFn, randomFn, i = 0) {
    //broken recurrence function - throw max stack
    const random = randomFn();

    if (conditionFn(random) && i < 100) {
        ++i;
        return randomFromRangeUntilTrue(conditionFn, randomFn, i)
    }

    return random;
}