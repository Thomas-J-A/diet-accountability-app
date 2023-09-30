// Narrows to string type
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
