export interface MatchedElement {
  id: string;
  matchedId: string;
}

class MatchingService {
  private static isChanceOfConflict(toRandomIds: string[], lastElementId: string): boolean {
    return toRandomIds.some((id) => id === lastElementId);
  }
  private static getRandomId(toRandomIds: string[]): string {
    return toRandomIds[Math.floor(Math.random() * toRandomIds.length)];
  }

  private static pullOutToRandomIds(
    matchedElements: MatchedElement[],
    inputMatchedElements: MatchedElement[],
    matchedElementId: string,
  ): string[] {
    return matchedElements
      .reduce((previousState, matchedElement) => {
        return previousState.filter((el) => el.id !== matchedElement.matchedId);
      }, inputMatchedElements)
      .map((el) => el.id)
      .filter((id) => id !== matchedElementId);
  }

  static matchElements<Type extends MatchedElement>(inputMatchedElements: Type[]): Type[] {
    return inputMatchedElements.reduce((matchedElements, matchedElement, index) => {
      let randomId;

      const toRandomIds = MatchingService.pullOutToRandomIds(
        matchedElements,
        inputMatchedElements,
        matchedElement.id,
      );
      const preLastMatchedElementIndex = inputMatchedElements.length - 2;
      const isChanceOfConflictFlagFn = () => {
        const lastMatchedElement = inputMatchedElements[inputMatchedElements.length - 1];
        const id = lastMatchedElement && lastMatchedElement.id;
        return MatchingService.isChanceOfConflict(toRandomIds, id);
      };

      if (preLastMatchedElementIndex === index && isChanceOfConflictFlagFn()) {
        randomId = inputMatchedElements[inputMatchedElements.length - 1].id;
      } else {
        randomId = MatchingService.getRandomId(toRandomIds);
      }

      matchedElements.push({ ...matchedElement, matchedId: randomId });

      return matchedElements;
    }, [] as Type[]);
  }
}

export default MatchingService;
