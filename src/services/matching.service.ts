import { injectable } from 'inversify';

export interface MatchedElement {
  id: string;
  matchedId: string;
}

@injectable()
export class MatchingService {
  public randomElements(elementList: MatchedElement[]): MatchedElement[] {
    return elementList.reduce((matchedElementList, element, index) => {
      let idElementRandom;

      const idListOfElementToRandom = pullOutIdsToRandom(
        matchedElementList,
        elementList,
        element.id,
      );
      const preLastElementIndex = elementList.length - 2;
      const isChanceOfConflictFlagFn = () => {
        const lastElement = elementList[elementList.length - 1];
        const id = lastElement && lastElement.id;
        return isChanceOfConflict(idListOfElementToRandom, id);
      };

      if (preLastElementIndex === index && isChanceOfConflictFlagFn()) {
        idElementRandom = elementList[elementList.length - 1].id;
      } else {
        idElementRandom = randomElementId(idListOfElementToRandom);
      }

      matchedElementList.push(Object.assign({}, element, { matchedId: idElementRandom }));

      return matchedElementList;
    }, []);
  }
}

function randomElementId(idListOfElementToRandom: string[]): string {
  return idListOfElementToRandom[Math.floor(Math.random() * idListOfElementToRandom.length)];
}

function isChanceOfConflict(idListOfElementToRandom: string[], lastElementId: string): boolean {
  return idListOfElementToRandom.some(id => id === lastElementId);
}

function pullOutIdsToRandom(
  matchedElementList: MatchedElement[],
  elementList: MatchedElement[],
  currentElementId: string,
): string[] {
  return matchedElementList
    .reduce((previousState, matchedElement) => {
      return previousState.filter(el => el.id !== matchedElement.matchedId);
    }, elementList)
    .map(el => el.id)
    .filter(id => id !== currentElementId);
}
