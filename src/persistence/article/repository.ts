import Comment from '../../domain/article/comment';
import IArticle from '../../domain/article/type';
import validateArticle from '../../domain/article/validator';
import ITopic from '../../domain/topic/type';
import logger from '../../logger';
import { articlesCache } from '../cache';
import validateObjectId from '../validator';
import ArticleModel from './model';

const modelToArticle = (model: { _doc: IArticle; }) => model._doc as IArticle;

const modelsToArticles = (models: { _doc: IArticle; }[]): IArticle[] => {
  const articles: IArticle[] = [];
  models.forEach((m: { _doc: IArticle; }) => articles.push(modelToArticle(m)));

  return articles;
};

const searchArticleByTitle = async (title: string): Promise<IArticle[]> => {
  const articles: IArticle[] = [];
  try {
    Object.keys(articlesCache).forEach((key) => {
      const article = articlesCache[key];
      if (article.title === title) {
        articles.push(article);
      }
    });
  } catch (error: any) {
    logger.error(error);
  }
  return articles;
};

const getAllArticles = async (): Promise<IArticle[]> => {
  const allArtcileModels = await ArticleModel.find({});

  const articleInterfaces = modelsToArticles(allArtcileModels);
  articleInterfaces.forEach((article) => {
    articlesCache[article._id] = article;
  });

  return articleInterfaces;
};

const getArticleById = async (id: string): Promise<IArticle | null> => {
  validateObjectId(id);

  if (articlesCache[id] !== null) return articlesCache[id];

  const articleModel = await ArticleModel.findById(id);

  if (articleModel === null) return null;

  const articleInterface = modelToArticle(articleModel);
  articlesCache[articleInterface._id] = articleInterface;
  return articleInterface;
};

const createNewArticle = async (article: IArticle): Promise<IArticle> => {
  const _article = {
    ...article, likes: 0, comments: <Comment[]>[], articles: <ITopic[]>[],
  } as IArticle;

  validateArticle(_article);

  const _articleModel = await ArticleModel.create(_article);
  const articleInterface = modelToArticle(_articleModel);
  articlesCache[articleInterface._id] = articleInterface;
  return articleInterface;
};

const updateArticle = async (article: IArticle): Promise<IArticle | null> => {
  let _article: IArticle;
  if (articlesCache[article._id] !== null) {
    _article = { ...articlesCache[article._id] };
    _article.title = article.title;
    _article.content = article.content;
  } else {
    return null;
  }

  validateArticle(article);

  const _articleModel = await ArticleModel.findByIdAndUpdate(article._id, article, { new: true });
  const articleInterface = modelToArticle(_articleModel);
  articlesCache[articleInterface._id] = articleInterface;
  return articleInterface;
};

const deleteArticle = async (id: string): Promise<IArticle | null> => {
  validateObjectId(id);

  if (articlesCache[id] === null) return null;

  const articleModel = await ArticleModel.findByIdAndDelete(id);
  const articleInterface = modelToArticle(articleModel);
  delete articlesCache[articleInterface._id];
  return articleInterface;
};

export {
  searchArticleByTitle,
  getAllArticles,
  getArticleById,
  createNewArticle,
  updateArticle,
  deleteArticle,
};
