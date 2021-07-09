import logger from '../../logger';
import TopicModel from './model';
import ITopic from '../../domain/topic/type';
import validateTopic from '../../domain/topic/validator';
import validateObjectId from '../validator';
import { topicsCache } from '../cache';

const modelToTopic = (model: { _doc: ITopic; }) => model._doc as ITopic;

const modelsToTopics = (models: { _doc: ITopic; }[]): ITopic[] => {
  const topics: ITopic[] = [];
  models.forEach((m: { _doc: ITopic; }) => topics.push(modelToTopic(m)));

  return topics;
};

const searchTopicByName = async (name: string): Promise<ITopic[]> => {
  const topics: ITopic[] = [];
  try {
    Object.keys(topicsCache).forEach((key) => {
      const article = topicsCache[key];
      if (article.name === name) {
        topics.push(article);
      }
    });
  } catch (error: any) {
    logger.error(error);
  }
  return topics;
};

const getAllTopics = async (): Promise<ITopic[]> => {
  const allTopicModels = await TopicModel.find({});

  const topicInterfaces = modelsToTopics(allTopicModels);
  topicInterfaces.forEach((topic) => {
    topicsCache[topic._id] = topic;
  });

  return topicInterfaces;
};

const getTopicById = async (id: string): Promise<ITopic | null> => {
  validateObjectId(id);

  if (topicsCache[id] !== null) return topicsCache[id];

  const topicModel = await TopicModel.findById(id);

  if (topicModel === null) return null;

  const topicInterface = modelToTopic(topicModel);
  topicsCache[topicInterface._id] = topicInterface;
  return topicInterface;
};

const createTopic = async (topic: ITopic): Promise<ITopic> => {
  validateTopic(topic);

  const _topicModel = await TopicModel.create(topic);
  const topicInterface = modelToTopic(_topicModel);
  topicsCache[topicInterface._id] = topicInterface;
  return topicInterface;
};

const updateTopic = async (topic: ITopic): Promise<ITopic | null> => {
  let _topic: ITopic;
  if (topicsCache[topic._id] !== null) {
    _topic = { ...topicsCache[topic._id] };
    _topic.name = topic.name;
    _topic.description = topic.description;
    _topic.color = topic.color;
  } else {
    return null;
  }

  validateTopic(topic);

  const _topicModel = await TopicModel.findByIdAndUpdate(topic._id, topic, { new: true });
  const topicInterface = modelToTopic(_topicModel);
  topicsCache[topicInterface._id] = topicInterface;
  return topicInterface;
};

const deleteTopic = async (id: string): Promise<ITopic | null> => {
  validateObjectId(id);

  if (topicsCache[id] === null) return null;

  const topicModel = await TopicModel.findByIdAndDelete(id);
  const topicInterface = modelToTopic(topicModel);
  delete topicsCache[topicInterface._id];
  return topicInterface;
};

export {
  searchTopicByName,
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
};
