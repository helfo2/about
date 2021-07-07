import Article from '../domain/article/article';
import Comment from '../domain/article/comment';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../domain/article/const';
import IArticle from '../domain/article/type';
import validateArticle from '../domain/article/validator';

const buildDummyArticle = () => new Article({
  title: 'Title 1', content: 'Content 1', likes: 0, publishedAt: undefined, comments: <Comment[]>[], createdAt: new Date(), updatedAt: new Date(),
} as IArticle);

const removeSecondFraction = (date: Date) => date.toISOString().slice(-4);

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
    expect(article.getPublishedAt()).toBe(undefined);

    const createdAt = article.getCreatedAt();
    if (createdAt !== undefined) {
      expect(removeSecondFraction(createdAt)).toStrictEqual(removeSecondFraction(now));
    }
    const updatedAt = article.getUpdatedAt();
    if (updatedAt !== undefined) {
      expect(removeSecondFraction(updatedAt)).toStrictEqual(removeSecondFraction(now));
    }
  });

  test('adding a like', () => {
    const article = buildDummyArticle();

    const likes = article.getLikes();
    article.addLike();
    expect(article.getLikes()).toBe(likes + 1);
  });

  describe('removing a like', () => {
    test('removes the like', () => {
      const article = buildDummyArticle();

      article.addLike();
      article.subtractLike();
      expect(article.getLikes()).toBe(0);
    });

    test('error when 0 likes', () => {
      const article = buildDummyArticle();
      expect(() => article.subtractLike()).toThrowError(`Article ${article.title}: likes are already zero`);
    });
  });

  describe('publishing an article', () => {
    test('publishes an article', () => {
      const article = buildDummyArticle();
      article.publish();
      expect(article.getPublishedAt()).not.toBe(undefined);
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
      expect(article.getPublishedAt()).toBe(undefined);
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

  describe('checking article constants', () => {
    test('TITLE_LENGTH', () => {
      expect(TITLE_MAX_LENGTH).toBe(30);
    });

    test('DESCRIPTION_LENGTH', () => {
      expect(CONTENT_MAX_LENGTH).toBe(10000);
    });
  });

  describe('validating an article', () => {
    test('validate title', () => {
      const title = 'a'.repeat(TITLE_MAX_LENGTH + 1);
      expect(() => validateArticle({
        title, content: 'Content 1', likes: 0, publishedAt: undefined, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article title is invalid');
    });

    test('validate content', () => {
      const content = 'a'.repeat(CONTENT_MAX_LENGTH + 1);
      expect(() => validateArticle({
        title: 'Title 1', content, likes: 0, publishedAt: undefined, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article content is invalid');
    });

    test('validate likes', () => {
      const likes = -1;
      expect(() => validateArticle({
        title: 'Title 1', content: 'Content 1', likes, publishedAt: undefined, comments: <Comment[]>[],
      } as IArticle)).toThrowError('Article likes are invalid');
    });

    test('ok', () => {
      expect(validateArticle({
        title: 'Title 1', content: 'Content 1', likes: 0, publishedAt: undefined, comments: <Comment[]>[],
      } as IArticle)).toBe(true);
    });
  });
});
