import { Request, Response } from 'express';
import ITopic from '../../domain/topic/type';
import logger from '../../logger';
import {
  createTopic, deleteTopic, getAllTopics, getTopicById, updateTopic,
} from '../../persistence/topic/repository';
import HttpStatusCode from '../helpers/httpStatusCode';

const getAll = async (req: Request, res: Response): Promise<void> => {
  let allTopics: ITopic[] = [];

  try {
    allTopics = await getAllTopics();

    res.status(HttpStatusCode.OK).send(allTopics);
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  let topic: ITopic | null;
  try {
    topic = await getTopicById(id);

    if (topic === null) {
      res.status(HttpStatusCode.NO_CONTENT).send();
    } else {
      res.status(HttpStatusCode.OK).send(topic);
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { name, description, color } = req.body;

  let topic: ITopic = { name, description, color } as ITopic;

  try {
    topic = await createTopic(topic);
    res.status(HttpStatusCode.OK).send(topic);
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const patch = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, color } = req.body;

  let topic: ITopic | null;
  try {
    topic = await updateTopic({
      _id: id, name, description, color,
    } as ITopic);
    if (topic !== null) {
      res.status(HttpStatusCode.OK).send(topic);
    } else {
      logger.warn(`Topic ${id} not found`);
      res.status(HttpStatusCode.NO_CONTENT).send();
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const _delete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  let topic: ITopic | null;
  try {
    topic = await deleteTopic(id);

    if (topic === null) {
      res.status(HttpStatusCode.NO_CONTENT).send();
    } else {
      res.status(HttpStatusCode.OK).send(topic);
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export default {
  get, getAll, create, patch, _delete,
};
