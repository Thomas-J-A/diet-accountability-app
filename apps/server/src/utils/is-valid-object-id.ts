const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const isValidObjectId = (id: string): boolean => objectIdRegex.test(id);

export default isValidObjectId;
