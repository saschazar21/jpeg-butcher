export const isProd = import.meta.env.PROD;

export const REGEX_HEX = /^[0-9a-f]+$/i;

export const toHex = (val: number): string => val.toString(16).padStart(2, '0');

export const validateHex = (val: string): boolean => REGEX_HEX.test(val);
