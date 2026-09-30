// Signed distance of `index` from `frontIndex` around a ring of `count` items,
// wrapped into (-count/2, count/2] so cards fan symmetrically off the front card.
export function signedOffset(index: number, frontIndex: number, count: number) {
  const raw = index - frontIndex;
  return (((raw + count / 2) % count) + count) % count - count / 2;
}
