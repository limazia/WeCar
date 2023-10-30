export function groupRow<T>(array: T[] = [], size = 3): T[][] {
  return array.reduce((groups, item, index) => {
    const groupIndex = Math.floor(index / size);

    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }

    groups[groupIndex].push(item);
    return groups;
  }, [] as T[][]);
}
