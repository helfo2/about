const { ObjectId } = require('mongoose').Types;

const validateObjectId = (id: string): boolean => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) { return true; }
    throw Error('ObjectId is invalid');
  }
  throw Error('ObjectId is invalid');
};

export default validateObjectId;
