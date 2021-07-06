import Topic from '../domain/topic/topic';
import ITopic from '../domain/topic/type';

describe('testing topic behaviors', () => {
  test('creating a topic', () => {
    const name = 'Name 1';
    const description = 'Description 1';
    const color = 'Color 1';
    const topic = new Topic({ name, description, color } as ITopic);

    expect(topic.id).toBe(undefined);
    expect(topic.name).toBe(name);
    expect(topic.description).toBe(description);
    expect(topic.color).toBe(color);
  });
});
