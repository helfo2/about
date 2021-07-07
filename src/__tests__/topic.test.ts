import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH } from '../domain/topic/const';
import Topic from '../domain/topic/topic';
import ITopic from '../domain/topic/type';
import validateTopic from '../domain/topic/validator';

const removeSecondFraction = (date: Date) => date.toISOString().slice(-4);

describe('testing topic behaviors', () => {
  test('creating a topic', () => {
    const topic = new Topic({ name: 'Name 1', description: 'Description 1', color: '#000000' } as ITopic);
    const now = new Date();

    expect(topic.id).toBe(undefined);
    expect(topic.name).toBe('Name 1');
    expect(topic.description).toBe('Description 1');
    expect(topic.color).toBe('#000000');

    const createdAt = topic.getCreatedAt();
    if (createdAt !== undefined) {
      expect(removeSecondFraction(createdAt)).toStrictEqual(removeSecondFraction(now));
    }
    const updatedAt = topic.getUpdatedAt();
    if (updatedAt !== undefined) {
      expect(removeSecondFraction(updatedAt)).toStrictEqual(removeSecondFraction(now));
    }
  });

  describe('checking topic constants', () => {
    test('NAME_LENGTH', () => {
      expect(NAME_MAX_LENGTH).toBe(30);
    });

    test('DESCRIPTION_LENGTH', () => {
      expect(DESCRIPTION_MAX_LENGTH).toBe(100);
    });
  });

  describe('validating a topic', () => {
    test('validate name', () => {
      const name = 'a'.repeat(NAME_MAX_LENGTH + 1);
      expect(() => validateTopic({ name, description: 'Description 1', color: '#000000' } as ITopic)).toThrowError('Topic name is invalid');
    });

    test('validate description', () => {
      const description = 'a'.repeat(DESCRIPTION_MAX_LENGTH + 1);
      expect(() => validateTopic({ name: 'Name 1', description, color: '#000000' } as ITopic)).toThrowError('Topic description is invalid');
    });

    test('validate color', () => {
      const color = 'wrong_format_color';
      expect(() => validateTopic({ name: 'Name 1', description: 'Description 1', color } as ITopic)).toThrowError('Topic color is invalid');
    });

    test('ok', () => {
      expect(validateTopic({ name: 'Name 1', description: 'Description 1', color: '#000000' } as ITopic)).toBe(true);
    });
  });
});
