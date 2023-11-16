/* eslint-disable @typescript-eslint/no-explicit-any */
export function enumValidate(object: any, value: string) {
  return Object.values(object).includes(value);
}
