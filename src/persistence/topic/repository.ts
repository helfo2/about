import logger from '../../logger';
import TopicModel from './model';
import ITopic from '../../domain/topic/type';
import validateTopic from '../../domain/topic/validator';
import validateObjectId from './validator';

const modelToTopic = (model: { _doc: ITopic; }) => model._doc as ITopic;

const modelsToTopics = (models: { _doc: ITopic; }[]): ITopic[] => {
  const topics: ITopic[] = [];
  models.forEach((m: { _doc: ITopic; }) => topics.push(modelToTopic(m)));

  return topics;
};

const searchTopicByName = async (name: string): Promise<ITopic[]> => {
  let topics: ITopic[] = [];
  try {
    const topicModels = await TopicModel.find({ name });
    topics = modelsToTopics(topicModels);
  } catch (error: any) {
    logger.error(error);
  }
  return topics;
};

const getAllTopics = async (): Promise<ITopic[]> => {
  const allTopicModels = await TopicModel.find({});
  return modelsToTopics(allTopicModels);
};

const getTopicById = async (id: string): Promise<ITopic | null> => {
  validateObjectId(id);

  const topicModel = await TopicModel.findById(id);

  if (topicModel === null) return null;
  return modelToTopic(topicModel);
};

const createTopic = async (topic: ITopic): Promise<ITopic> => {
  validateTopic(topic);

  const _topicModel = await TopicModel.create(topic);
  return modelToTopic(_topicModel);
};

const updateTopic = async (topic: ITopic): Promise<ITopic> => {
  validateTopic(topic);

  const _topicModel = await TopicModel.findByIdAndUpdate(topic._id, topic, { new: true });
  return modelToTopic(_topicModel);
};

const deleteTopic = async (id: string): Promise<ITopic> => {
  validateObjectId(id);

  const topicModel = await TopicModel.findByIdAndDelete(id);
  return modelToTopic(topicModel);
};

export {
  searchTopicByName,
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
};
