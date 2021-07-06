import IArticle from '../domain/article/type';
import ITopic from '../domain/topic/type';
import logger from '../logger';
import { getAllArticles } from './article/repository';
import { getAllTopics } from './topic/repository';

interface IDictionary<T> {
  [Key: string]: T;
}

const topicsCache: IDictionary<ITopic> = {};
const articlesCache: IDictionary<IArticle> = {};

const initializeTopics = async () => {
  try {
    const allTopics = await getAllTopics();

    allTopics.forEach((topic) => {
      topicsCache[topic._id] = topic;
    });
  } catch (error: any) {
    logger.error(error);
  }
};

const initializeArticles = async () => {
  try {
    const allArticles = await getAllArticles();

    allArticles.forEach((article) => {
      articlesCache[article._id] = article;
    });
  } catch (error: any) {
    logger.error(error);
  }
};

const initialize = async (): Promise<void> => {
  await initializeTopics();
  await initializeArticles();
};

export { topicsCache, articlesCache, initialize };
