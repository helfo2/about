import ITopic from './type';

const NAME_LENGTH = 30;
const DESCRIPTION_LENGTH = 100;

const validateName = (name: string): boolean => (name.length <= NAME_LENGTH);

const validateDescription = (description: string): boolean => (description.length <= DESCRIPTION_LENGTH);

const validateColor = (description: string): boolean => {
  const regex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
  return regex.test(description);
};

const validateTopic = (topic: ITopic): boolean => {
  if (!validateName(topic.name)) throw Error('Topic name is invalid');
  if (!validateDescription(topic.description)) throw Error('Topic description is invalid');
  if (!validateColor(topic.color)) throw Error('Topic color is invalid');

  return true;
};

export default validateTopic;
