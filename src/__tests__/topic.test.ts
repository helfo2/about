import Topic from '../domain/topic/topic';

describe('testing topic behaviors', () => {
  test('creating a topic', () => {
    const name = 'Name 1';
    const description = 'Description 1';
    const color = 'Color 1';
    const article = new Topic(name, description, color);

    expect(article.id).toBe('');
    expect(article.name).toBe(name);
    expect(article.description).toBe(description);
    expect(article.color).toBe(color);
    expect(article.getCreatedAt()).not.toBe(undefined);
    expect(article.getUpdatedAt()).not.toBe(undefined);
    expect(article.getUpdatedAt()).toBe(article.getCreatedAt());
  });
});
