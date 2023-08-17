import uniqueRandomArray from "unique-random-array";

function useRandomItems(items, randomItemCount) {
  if (!items) return [];
  const Indices = Array.from({ length: items.length }, (_, index) => index);
  const random = uniqueRandomArray(Indices);
  const randomItemsIndices = [];
  for (let i = 0; i < randomItemCount; i++) {
    randomItemsIndices.push(random());
  }
  return randomItemsIndices.map((item) => Indices[item]);
}

export { useRandomItems };
