import { injectable } from 'inversify';

export interface MatchedElement {
  id: string;
  matchedId: string;
}

@injectable()
export class MatchingService {
  randomMatchedElements(matchedElements: MatchedElement[]): MatchedElement[] {
    return matchedElements.reduce((matchedElementsState, matchedElement, index) => {
      let randomId;

      const toRandomIds = pullOutToRandomIds(
        matchedElementsState,
        matchedElements,
        matchedElement.id,
      );
      const preLastMatchedElementIndex = matchedElements.length - 2;
      const isChanceOfConflictFlagFn = () => {
        const lastMatchedElement = matchedElements[matchedElements.length - 1];
        const id = lastMatchedElement && lastMatchedElement.id;
        return isChanceOfConflict(toRandomIds, id);
      };

      if (preLastMatchedElementIndex === index && isChanceOfConflictFlagFn()) {
        randomId = matchedElements[matchedElements.length - 1].id;
      } else {
        randomId = getRandomId(toRandomIds);
      }

      matchedElementsState.push(Object.assign({}, matchedElement, { matchedId: randomId }));

      return matchedElementsState;
    }, []);
  }
}

function getRandomId(toRandomIds: string[]): string {
  return toRandomIds[Math.floor(Math.random() * toRandomIds.length)];
}

function isChanceOfConflict(toRandomIds: string[], lastElementId: string): boolean {
  return toRandomIds.some(id => id === lastElementId);
}

function pullOutToRandomIds(
  matchedElementsState: MatchedElement[],
  matchedElements: MatchedElement[],
  matchedElementId: string,
): string[] {
  return matchedElementsState
    .reduce((previousState, matchedElement) => {
      return previousState.filter(el => el.id !== matchedElement.matchedId);
    }, matchedElements)
    .map(el => el.id)
    .filter(id => id !== matchedElementId);
}
