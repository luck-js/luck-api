import { injectable } from 'inversify';

export interface MatchedElement {
    id: string;
    matchedId: string;
}

@injectable()
export class MatchingService {

    public randomElements(matchedElementList: MatchedElement[]): MatchedElement[] {

        return matchedElementList.reduce((matchedElementList, element, index) => {
            let idElementRandom;

            const idListOfElementToRandom = pullOutIdsToRandom(matchedElementList, matchedElementList, element.id);
            const preLastElementIndex = matchedElementList.length - 2;
            const isChanceOfConflictFlagFn = () => {
                return isChanceOfConflict(idListOfElementToRandom, matchedElementList[matchedElementList.length - 1].id)
            };

            if (preLastElementIndex === index && isChanceOfConflictFlagFn()) {
                idElementRandom = matchedElementList[matchedElementList.length - 1].id

            } else {
                idElementRandom = randomElementId(idListOfElementToRandom);

            }

            matchedElementList.push(Object.assign({}, element, { matchedId: idElementRandom }));

            return matchedElementList;
        }, []);
    }

}

function randomElementId(idListOfElementToRandom) {
    return idListOfElementToRandom[Math.floor(Math.random() * idListOfElementToRandom.length)];
}

function isChanceOfConflict(idListOfElementToRandom, lastElementId): boolean {
    return idListOfElementToRandom.some((id) => id === lastElementId);
}

function pullOutIdsToRandom(matchedElementList, elementList, currentElementId) {
    return matchedElementList
        .reduce((previousState, matchedElement) => {
            return previousState
                .filter((el) => el.id !== matchedElement.matchedId)

        }, elementList)
        .map((el) => el.id)
        .filter((id) => id !== currentElementId)
}
