export interface Element {
  id: string;
}

export interface MatchedElement {
  id: string;
  matchedId: string;
}

class MatchingService {
  private static areIdsUnique(elements: Element[]): boolean {
    const idSet = new Set<string>();

    return elements.every((element) => !idSet.has(element.id) && idSet.add(element.id));
  }

  private static randomId(ids: string[]): string {
    return ids[Math.floor(Math.random() * ids.length)];
  }

  static matchElements<T extends Element>(elements: T[]): (T & MatchedElement)[] {
    if (elements.length < 2) {
      throw new Error('Not enough elements to match');
    }

    if (!MatchingService.areIdsUnique(elements)) {
      throw new Error("List of element IDs aren't unique");
    }

    const usedIds = new Set<string>();
    const matchedElements: (T & MatchedElement)[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const availableIds = elements.map((e) => e.id).filter((e) => e !== element.id);
      const unusedIds = availableIds.filter((id) => !usedIds.has(id));

      if (unusedIds.length === 0) {
        return MatchingService.matchElements(elements);
      }

      const matchedId = MatchingService.randomId(unusedIds);

      usedIds.add(matchedId);

      matchedElements.push({ matchedId, ...element });
    }

    return matchedElements;
  }
}

export default MatchingService;
