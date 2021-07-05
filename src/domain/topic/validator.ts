import ITopic from './type';

const NAME_LENGTH = 30;
const DESCRIPTION_LENGTH = 100;

const validateName = (name: string): boolean => {
  if (name.length >= NAME_LENGTH) return false;

  const regex = new RegExp('/^[a-z ,.\'-]+$/i');
  return regex.test(name);
};

const validateDescription = (description: string): boolean => {
  if (description.length >= DESCRIPTION_LENGTH) return false;

  const regex = new RegExp('/^[a-z ,.\'-]+$/i');
  return regex.test(description);
};

const validateColor = (description: string): boolean => {
  const regex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
  return regex.test(description);
};

const validateTopic = (topic: ITopic): boolean => {
  if (!validateName(topic._name)) throw Error('Topic name is invalid');
  if (!validateDescription(topic._description)) throw Error('Topic description is invalid');
  if (!validateColor(topic._color)) throw Error('Topic color is invalid');

  return true;
};

export default validateTopic;
