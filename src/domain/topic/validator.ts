import { DESCRIPTION_LENGTH, NAME_LENGTH } from './const';
import ITopic from './type';

const validateName = (name: string): boolean => (name.length <= NAME_LENGTH);

// eslint-disable-next-line max-len
const validateDescription = (description: string): boolean => (description.length <= DESCRIPTION_LENGTH);

const validateColor = (description: string): boolean => {
  const regex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
  return regex.test(description);
};

const validateTopic = (topic: ITopic): boolean => {
  if (!validateName(topic.name)) throw new Error('Topic name is invalid');
  if (!validateDescription(topic.description)) throw new Error('Topic description is invalid');
  if (!validateColor(topic.color)) throw new Error('Topic color is invalid');

  return true;
};

export default validateTopic;
