const MARKERS = [
  0xd8, 0xc0, 0xc2, 0xc4, 0xdb, 0xdd, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6,
  0xd7, 0xda, 0xe0, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea,
  0xeb, 0xec, 0xed, 0xee, 0xef, 0xfe, 0xd9,
];

const checkMarker = (value: number, offset: number, bytes: number[]) =>
  value === 0xff && MARKERS.includes(bytes[offset + 1]) && offset;

const getMarkerIndexes = (bytes: Uint8Array) => {
  const array = [...bytes];
  return array
    .map(checkMarker)
    .filter((value: number | false) => value !== false);
};

onmessage = ({ data }: MessageEvent<ArrayBuffer>) =>
  postMessage(getMarkerIndexes(data as Uint8Array));
