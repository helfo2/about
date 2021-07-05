import Article from '../domain/article/article';
import Comment from '../domain/article/comment';

describe('testing article behaviors', () => {
  test('creating an article', () => {
    const title = 'Title 1';
    const content = 'Content 1';
    const article = new Article(title, content);

    expect(article.id).toBe('');
    expect(article.title).toBe(title);
    expect(article.content).toBe(content);
    expect(article.getLikes()).toBe(0);
    expect(article.getPublishedAt()).toBe(undefined);
  });

  test('adding a like', () => {
    const article = new Article('Title 1', 'Content 1');
    const likes = article.getLikes();
    article.addLike();
    expect(article.getLikes()).toBe(likes + 1);
  });

  describe('removing a like', () => {
    test('removes the like', () => {
      const article = new Article('Title 1', 'Content 1');
      article.addLike();
      article.subtractLike();
      expect(article.getLikes()).toBe(0);
    });

    test('error when 0 likes', () => {
      const article = new Article('Title 1', 'Content 1');
      expect(() => article.subtractLike()).toThrowError(`Article ${article.title}: likes are already zero`);
    });
  });

  describe('publishing an article', () => {
    test('publishes an article', () => {
      const article = new Article('Title 1', 'Content 1');
      article.publish();
      expect(article.getPublishedAt()).not.toBe(undefined);
    });

    test('error when already published', () => {
      const article = new Article('Title 1', 'Content 1');
      article.publish();
      expect(() => article.publish()).toThrowError(`Article ${article.title}: has already been published`);
    });
  });

  describe('unpublishing an article', () => {
    test('unpublishes an article', () => {
      const article = new Article('Title 1', 'Content 1');
      article.publish();
      article.unpublish();
      expect(article.getPublishedAt()).toBe(undefined);
    });

    test('error when already unpublished', () => {
      const article = new Article('Title 1', 'Content 1');
      expect(() => article.unpublish()).toThrowError(`Article ${article.title}: has already been unpublished`);
    });
  });

  describe('commenting an article', () => {
    test('comment an article', () => {
      const article = new Article('Title 1', 'Content 1');
      article.publish();
      article.addComment(new Comment('Comment 1'));
      expect(article.getComments().length).toBe(1);
    });

    test('error when article is not published yet', () => {
      const article = new Article('Title 1', 'Content 1');
      expect(() => article.addComment(new Comment('Comment 1'))).toThrowError(`Article ${article.title}: can't comment on an unpublished article`);
    });
  });

  describe('uncommenting an article', () => {
    test('uncomment an article', () => {
      const comment = new Comment('Comment 1');

      const article = new Article('Title 1', 'Content 1');
      article.publish();
      article.addComment(comment);
      article.removeComment(comment);
      expect(article.getComments().length).toBe(0);
    });

    test('error when article is not published yet', () => {
      const comment = new Comment('Comment 1');

      const article = new Article('Title 1', 'Content 1');
      article.publish();
      expect(() => article.removeComment(comment)).toThrowError(`Article ${article.title}: does not contain comment`);
    });
  });
});
