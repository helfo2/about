import Article from '../domain/article/article';
import Comment from '../domain/article/comment';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../domain/article/const';
import IArticle from '../domain/article/type';
import validateArticle from '../domain/article/validator';
import ITopic from '../domain/topic/type';

const buildDummyArticle = () => new Article({
  title: 'Title 1', content: 'Content 1', likes: 0, publishedAt: null, comments: <Comment[]>[], createdAt: new Date(), updatedAt: new Date(), topics: <ITopic[]>[],
} as IArticle);

const removeSecondFraction = (date: Date) => date.toISOString().slice(0, -4);

describe('testing article behaviors', () => {
  test('creating an article', () => {
    const title = 'Title 1';
    const content = 'Content 1';
    const article = buildDummyArticle();
    const now = new Date();
    expect(article.id).toBe(undefined);
    expect(article.title).toBe(title);
    expect(article.content).toBe(content);
    expect(article.getComments()).toStrictEqual(<Comment[]>[]);
    expect(article.getLikes()).toBe(0);
    expect(article.getPublishedAt()).toBe(null);
    expect(removeSecondFraction(article.getCreatedAt())).toStrictEqual(removeSecondFraction(now));
    expect(removeSecondFraction(article.getUpdatedAt())).toStrictEqual(removeSecondFraction(now));
  });

  describe('liking an article', () => {
    test('adding a like', () => {
      const article = buildDummyArticle();
      article.publish();

      const likes = article.getLikes();
      article.addLike();
      expect(article.getLikes()).toBe(likes + 1);
    });

    test('error when not published yet', () => {
      const article = buildDummyArticle();

      expect(() => article.addLike()).toThrowError(`Article ${article.title}: can't like an unpublished article`);
    });
  });

  describe('un-liking an article', () => {
    test('removes the like', () => {
      const article = buildDummyArticle();
      article.publish();
      article.addLike();
      article.subtractLike();
      expect(article.getLikes()).toBe(0);
    });

    test('error when not published', () => {
      const article = buildDummyArticle();

      expect(() => article.subtractLike()).toThrowError(`Article ${article.title}: can't un-like an unpublished article`);
    });

    test('error when 0 likes', () => {
      const article = buildDummyArticle();
      article.publish();
      expect(() => article.subtractLike()).toThrowError(`Article ${article.title}: likes are already zero`);
    });
  });

  describe('publishing an article', () => {
    test('publishes an article', () => {
      const article = buildDummyArticle();
      article.publish();
      expect(article.getPublishedAt()).not.toBe(null);
    });

    test('error when already published', () => {
      const article = buildDummyArticle();
      article.publish();
      expect(() => article.publish()).toThrowError(`Article ${article.title}: has already been published`);
    });
  });

  describe('unpublishing an article', () => {
    test('unpublishes an article', () => {
      const article = buildDummyArticle();
      article.publish();
      article.unpublish();
      expect(article.getPublishedAt()).toBe(null);
    });

    test('error when already unpublished', () => {
      const article = buildDummyArticle();
      expect(() => article.unpublish()).toThrowError(`Article ${article.title}: has already been unpublished`);
    });
  });

  describe('commenting an article', () => {
    test('create a comment', () => {
      const now = new Date();
      const comment = new Comment('Comment 1');
      expect(comment.description).toBe('Comment 1');
      expect(removeSecondFraction(comment.madeAt)).toStrictEqual(removeSecondFraction(now));
    });

    test('comment an article', () => {
      const article = buildDummyArticle();
      article.publish();
      article.addComment(new Comment('Comment 1'));
      expect(article.getComments().length).toBe(1);
    });

    test('error when article is not published yet', () => {
      const article = buildDummyArticle();
      expect(() => article.addComment(new Comment('Comment 1'))).toThrowError(`Article ${article.title}: can't comment on an unpublished article`);
    });
  });

  describe('uncommenting an article', () => {
    test('uncomment an article', () => {
      const comment = new Comment('Comment 1');

      const article = buildDummyArticle();
      article.publish();
      article.addComment(comment);
      article.removeComment(comment);
      expect(article.getComments().length).toBe(0);
    });

    test('error when article is not published yet', () => {
      const comment = new Comment('Comment 1');

      const article = buildDummyArticle();
      article.publish();
      expect(() => article.removeComment(comment)).toThrowError(`Article ${article.title}: does not contain comment`);
    });
  });

  describe('commenting an article', () => {
    test('create a comment', () => {
      const now = new Date();
      const comment = new Comment('Comment 1');
      expect(comment.description).toBe('Comment 1');
      expect(removeSecondFraction(comment.madeAt)).toStrictEqual(removeSecondFraction(now));
    });

    test('comment an article', () => {
      const article = buildDummyArticle();
      article.publish();
      article.addComment(new Comment('Comment 1'));
      expect(article.getComments().length).toBe(1);
    });

    test('error when article is not published yet', () => {
      const article = buildDummyArticle();
      expect(() => article.addComment(new Comment('Comment 1'))).toThrowError(`Article ${article.title}: can't comment on an unpublished article`);
    });
  });

  describe('labeling an article with topics', () => {
    test('add a topic', () => {
      const article = buildDummyArticle();
      article.addTopic({ name: 'Name 1', description: '', color: '' } as ITopic);
      expect(article.getTopics().length).toBe(1);
    });

    test('remove a topic', () => {
      const article = buildDummyArticle();
      article.addTopic({ name: 'Name 1', description: '', color: '' } as ITopic);
      article.removeTopic({ name: 'Name 1', description: '', color: '' } as ITopic);
      expect(article.getTopics().length).toBe(0);
    });

    test('error when topic is not present', () => {
      const article = buildDummyArticle();
      expect(article.getTopics().length).toBe(0);
      expect(() => article.removeTopic({ name: 'Name 1', description: '', color: '' } as ITopic)).toThrowError(`Article ${article.title}: does not contain topic`);
    });
  });

  describe('checking article constants', () => {
    test('TITLE_LENGTH', () => {
      expect(TITLE_MAX_LENGTH).toBe(30);
    });

    test('DESCRIPTION_LENGTH', () => {
      expect(CONTENT_MAX_LENGTH).toBe(10000);
    });
  });

  describe('converting article to interface', () => {
    test('all properties are set', () => {
      const article = buildDummyArticle();
      const _article = article.asIArticle();

      expect(article.id).toBe(_article._id);
      expect(article.title).toBe(_article.title);
      expect(article.content).toBe(_article.content);
      expect(article.getComments()).toBe(_article.comments);
      expect(article.getTopics()).toBe(_article.topics);
      expect(article.getLikes()).toBe(_article.likes);
      expect(article.getPublishedAt()).toBe(_article.publishedAt);
      expect(article.getCreatedAt()).toBe(_article.createdAt);
      expect(article.getUpdatedAt()).toBe(_article.updatedAt);
    });
  });

  describe('validating an article', () => {
    test('validate title', () => {
      const title = 'a'.repeat(TITLE_MAX_LENGTH + 1);
      expect(() => validateArticle({
        title, content: 'Content 1', likes: 0, publishedAt: null, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article title is invalid');
    });

    test('validate content', () => {
      const content = 'a'.repeat(CONTENT_MAX_LENGTH + 1);
      expect(() => validateArticle({
        title: 'Title 1', content, likes: 0, publishedAt: null, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article content is invalid');
    });

    test('validate likes', () => {
      const likes = -1;
      expect(() => validateArticle({
        title: 'Title 1', content: 'Content 1', likes, publishedAt: null, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article likes are invalid');
    });

    test('ok', () => {
      expect(validateArticle({
        title: 'Title 1', content: 'Content 1', likes: 0, publishedAt: null, comments: <Comment[]>[],
      } as IArticle)).toBe(true);
    });
  });
});
