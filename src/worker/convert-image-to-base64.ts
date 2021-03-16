import type { Dimensions } from 'components/ImageViewer';

const SOFn_MARKER = [0xc0, 0xc3];

const HEIGHT_OFFSET = [5, 6];
const WIDTH_OFFSET = [7, 8];

const getMarker = (val: number, offset: number, arr: number[]) =>
  val === 0xff &&
  arr[offset + 1] >= SOFn_MARKER[0] &&
  arr[offset + 1] <= SOFn_MARKER[1];

const getDimensions = (data: Uint8Array): Dimensions => {
  const arr = [...data];
  const i = arr.findIndex(getMarker);

  if (i < 0) {
    return {
      height: 0,
      width: 0,
    };
  }

  const height = arr[i + HEIGHT_OFFSET[0]] * 2 ** 8 + arr[i + HEIGHT_OFFSET[1]];
  const width = arr[i + WIDTH_OFFSET[0]] * 2 ** 8 + arr[i + WIDTH_OFFSET[1]];

  return {
    height,
    width,
  };
};

onmessage = ({ data }: MessageEvent<ArrayBuffer>) =>
  postMessage(getDimensions(data as Uint8Array));
