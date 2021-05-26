import type { ImageDimensions } from 'utils/context';

// Start Of Frame marker
const SOFn_MARKER = [0xc0, 0xc3];

// Byte offset for height/width information
const HEIGHT_OFFSET = [5, 6]; // height is 5-6 bytes away from 0xFF marker
const WIDTH_OFFSET = [7, 8]; // width is 7-8 bytes away from 0xFF marker

/**
 * Check whether current byte position is a valid SOFn marker, will be used within an iterator
 *
 * @param {number} val - the value of the current byte
 * @param {number} offset - the total offset of the current byte based on the first byte
 * @param {number[]} arr - the byte array
 * @returns {boolean} - whether a SOFn marker has been detected at the current position
 */
const getMarker = (val: number, offset: number, arr: number[]) =>
  val === 0xff &&
  arr[offset + 1] >= SOFn_MARKER[0] &&
  arr[offset + 1] <= SOFn_MARKER[1];

/**
 * Extracts the dimensions (width/height) from the JPEG byte array
 *
 * @param {Uint8Array} data - the image as Uint8Array
 * @returns {ImageDimensions} - the dimensions as ImageDimensions object
 */
const getDimensions = (data: Uint8Array): ImageDimensions => {
  const arr = [...data];
  const i = arr.findIndex(getMarker);
  const dimensions = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  if (i < 0) {
    return dimensions;
  }

  // take the first byte of the dimensions value, multiply it by 256 and add the second byte
  const height = arr[i + HEIGHT_OFFSET[0]] * 2 ** 8 + arr[i + HEIGHT_OFFSET[1]];
  const width = arr[i + WIDTH_OFFSET[0]] * 2 ** 8 + arr[i + WIDTH_OFFSET[1]];

  return {
    ...dimensions,
    height,
    width,
  };
};

onmessage = ({ data }: MessageEvent<ArrayBuffer>) =>
  postMessage(getDimensions(data as Uint8Array));
