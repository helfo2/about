import IArticle from '../../domain/article/type';
import validateArticle from '../../domain/article/validator';
import logger from '../../logger';
import validateObjectId from '../validator';
import ArticleModel from './model';

const modelToArticle = (model: { _doc: IArticle; }) => model._doc as IArticle;

const modelsToArticles = (models: { _doc: IArticle; }[]): IArticle[] => {
  const topics: IArticle[] = [];
  models.forEach((m: { _doc: IArticle; }) => topics.push(modelToArticle(m)));

  return topics;
};

const searchArticleByTitle = async (title: string): Promise<IArticle[]> => {
  let topics: IArticle[] = [];
  try {
    const articleModels = await ArticleModel.find({ name: title });
    topics = modelsToArticles(articleModels);
  } catch (error: any) {
    logger.error(error);
  }
  return topics;
};

const getAllArticles = async (): Promise<IArticle[]> => {
  const allArtcileModels = await ArticleModel.find({});
  return modelsToArticles(allArtcileModels);
};

const getArticleById = async (id: string): Promise<IArticle | null> => {
  validateObjectId(id);

  const articleModel = await ArticleModel.findById(id);

  if (articleModel === null) return null;
  return modelToArticle(articleModel);
};

const createArticle = async (article: IArticle): Promise<IArticle> => {
  validateArticle(article);

  const _articleModel = await ArticleModel.create(article);
  return modelToArticle(_articleModel);
};

const updateArticle = async (article: IArticle): Promise<IArticle> => {
  validateArticle(article);

  const _articleModel = await ArticleModel.findByIdAndUpdate(article._id, article, { new: true });
  return modelToArticle(_articleModel);
};

const deleteArticle = async (id: string): Promise<IArticle> => {
  validateObjectId(id);

  const articleModel = await ArticleModel.findByIdAndDelete(id);
  return modelToArticle(articleModel);
};

export {
  searchArticleByTitle,
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
