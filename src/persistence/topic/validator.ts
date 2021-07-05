const { ObjectId } = require('mongoose').Types;

const validateObjectId = (id: string): boolean => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) { return true; }
    throw Error('The ObjectId is invalid');
  }
  throw Error('The ObjectId is invalid');
};

export default validateObjectId;
