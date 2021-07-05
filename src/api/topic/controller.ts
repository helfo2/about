import { Request, Response } from 'express';
import ITopic from '../../domain/topic/type';
import logger from '../../logger';
import { topicsCache } from '../../persistence/cache';
import {
  createTopic, deleteTopic, getAllTopics, getTopicById, updateTopic,
} from '../../persistence/topic/repository';
import HttpStatusCode from '../helpers/httpStatusCode';

const getAll = async (req: Request, res: Response): Promise<void> => {
  let allTopics: ITopic[] = [];

  try {
    allTopics = await getAllTopics();
    allTopics.forEach((topic) => {
      topicsCache[topic._id] = topic;
    });

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
    if (topicsCache[id] !== undefined) {
      topic = topicsCache[id];
      res.status(HttpStatusCode.OK).send(topic);
    } else {
      topic = await getTopicById(id);

      if (topic === undefined) {
        res.status(HttpStatusCode.NO_CONTENT).send();
      } else {
        res.status(HttpStatusCode.OK).send(topic);
        if (topic !== null) topicsCache[topic._id] = topic;
      }
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { name, description, color } = req.body;

  let topic: ITopic = { _name: name, _description: description, _color: color } as ITopic;

  try {
    topic = await createTopic(topic);
    topicsCache[topic._id] = topic;
    res.status(HttpStatusCode.OK).send(topic);
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const patch = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, color } = req.body;

  let topic: ITopic;
  try {
    if (topicsCache[id] !== undefined) {
      topic = { ...topicsCache[id] };
      topic._name = name;
      topic._description = description;
      topic._color = color;

      topic = await updateTopic(topic);
      topicsCache[topic._id] = topic;
      res.status(HttpStatusCode.OK).send(topic);
    } else {
      logger.warning(`Topic ${id} not found`);
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

    if (topic === undefined) {
      res.status(HttpStatusCode.NO_CONTENT).send();
    } else {
      res.status(HttpStatusCode.OK).send(topic);
      if (topic !== null) topicsCache[topic._id] = topic;
    }
  } catch (error: any) {
    logger.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export default {
  get, getAll, create, patch, _delete,
};
