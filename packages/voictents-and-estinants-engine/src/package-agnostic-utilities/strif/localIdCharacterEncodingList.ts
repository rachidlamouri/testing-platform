const inclusiveRange = (inclusiveEnd: number, inclusiveStart: number): number =>
  inclusiveEnd - inclusiveStart + 1;

const visibleCodePointInclusiveRangeList = [
  [0x30, 0x39],
  [0x41, 0x5a],
];

const visibleCodePointList = visibleCodePointInclusiveRangeList.flatMap(
  ([inclusiveStart, inclusiveEnd]) => {
    const range = inclusiveRange(inclusiveEnd, inclusiveStart);
    const valueList = Array.from({ length: range }).map((unused, index) => {
      const value = inclusiveStart + index;
      return value;
    });

    return valueList;
  },
);

export const localIdCharacterEncodingList = visibleCodePointList.map(
  (characterCode) => String.fromCharCode(characterCode),
);
