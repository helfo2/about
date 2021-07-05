import ArticleEntity from '../domain/article/entity';
import ITopic from '../domain/topic/type';
import logger from '../logger';
import { getAllTopics } from './topic/repository';

interface IDictionary<T> {
  [Key: string]: T;
}

const topicsCache: IDictionary<ITopic> = {};
const articlesCache: IDictionary<ArticleEntity> = {};

async function initializeTopics() {
  try {
    const allTopics = await getAllTopics();

    allTopics.forEach((topic) => {
      topicsCache[topic._id] = topic;
    });
  } catch (error: any) {
    logger.error(error);
  }
}

const initialize = async (): Promise<void> => {
  await initializeTopics();
  // await initializeArticles();
};

// async function initializeArticles() {
//   let allTopics: Article[];

//   try {
//     allTopics = await ArticleModel.find({});

//     allTopics.forEach((topic) => {
//       topicsCache[topic.id] = topic;
//     });
//   } catch (error: any) {
//     logger.error(error);
//   }
// }

export { topicsCache, articlesCache, initialize };
