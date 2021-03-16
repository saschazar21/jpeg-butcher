const APP_MARKER_MIN = 0xe1;
const APP_MARKER_MAX = 0xef;

const isAppMarker = (val: number, offset: number, arr: number[]) => {
  const marker = arr[offset + 1];
  return (
    val === 0xff &&
    !isNaN(marker) &&
    marker >= APP_MARKER_MIN &&
    marker <= APP_MARKER_MAX
  );
};

const stripExif = (data: ArrayBuffer): Uint8Array => {
  const arr = [...new Uint8Array(data)];
  let i = 0;
  while ((i = arr.findIndex(isAppMarker)) > -1) {
    const [, , first = 0, second = 0] = arr.slice(i, i + 4);
    arr.splice(i, first * 2 ** 8 + second + 2);
  }
  return new Uint8Array(arr);
};

onmessage = ({ data }: MessageEvent<ArrayBuffer>) =>
  postMessage(stripExif(data));
