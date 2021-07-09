import { Request, Response } from 'express';
import IArticle from '../../domain/article/type';
import logger from '../../logger';
import {
  createNewArticle, deleteArticle, getAllArticles, getArticleById, updateArticle,
} from '../../persistence/article/repository';
import HttpStatusCode from '../helpers/httpStatusCode';
import Article from '../../domain/article/article';

const getAll = async (req: Request, res: Response): Promise<void> => {
  let allArticles: IArticle[] = [];

  try {
    allArticles = await getAllArticles();

    res.status(HttpStatusCode.OK).send(allArticles);
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  let article: IArticle | null;
  try {
    article = await getArticleById(id);

    if (article === null) {
      res.status(HttpStatusCode.NO_CONTENT).send();
    } else {
      res.status(HttpStatusCode.OK).send(article);
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;

  let article: IArticle = {
    title, content,
  } as IArticle;

  try {
    article = await createNewArticle(article);
    res.status(HttpStatusCode.OK).send(article);
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const patch = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;

  let article: IArticle | null;
  try {
    article = await updateArticle({ _id: id, title, content } as IArticle);
    if (article !== null) {
      res.status(HttpStatusCode.OK).send(article);
    } else {
      logger.warn(`Article ${id} not found`);
      res.status(HttpStatusCode.NO_CONTENT).send();
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const _delete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  let article: IArticle | null;
  try {
    article = await deleteArticle(id);

    if (article === null) {
      res.status(HttpStatusCode.NO_CONTENT).send();
    } else {
      res.status(HttpStatusCode.OK).send(article);
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const addLike = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  let article: IArticle | null;
  try {
    article = await getArticleById(id);

    if (article !== null) {
      const articleEntity = new Article(article);
      articleEntity.addLike();

      const articleInterface = await updateArticle(articleEntity.asIArticle());
      res.status(HttpStatusCode.OK).send(articleInterface);
    } else {
      res.status(HttpStatusCode.NO_CONTENT).send();
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const publish = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  let article: IArticle | null;

  try {
    article = await getArticleById(id);
    if (article !== null) {
      const articleEntity = new Article(article);
      articleEntity.publish();

      const articleInterface = await updateArticle(articleEntity.asIArticle());
      res.status(HttpStatusCode.OK).send(articleInterface);
    } else {
      res.status(HttpStatusCode.NO_CONTENT).send();
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export default {
  get, getAll, create, patch, _delete, addLike, publish,
};
