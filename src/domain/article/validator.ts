import IArticle from './type';

const TITLE_LENGTH = 30;
const CONTENT_LENGTH = 10000;

const validateTitle = (title: string): boolean => {
  if (title.length >= TITLE_LENGTH) return false;

  const regex = new RegExp('/^[a-z ,.\'-]+$/i');
  return regex.test(title);
};

const validateContent = (content: string): boolean => {
  if (content.length >= CONTENT_LENGTH) return false;

  const regex = new RegExp('/^[a-z ,.\'-]+$/i');
  return regex.test(content);
};

const validateLikes = (likes: number): boolean => likes > 0;

const validatePublishedAt = (publishedAt: Date | undefined): boolean => {
  if (publishedAt !== undefined) {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp('/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/');
    return regex.test(publishedAt.toISOString());
  }

  return true;
};

const validateArticle = (article: IArticle): boolean => {
  if (!validateTitle(article._title)) throw Error('Article title is invalid');
  if (!validateContent(article._content)) throw Error('Article content is invalid');
  if (!validateLikes(article._likes)) throw Error('Article likes are invalid');
  if (!validatePublishedAt(article._publishedAt)) throw Error('Aticle publishedAt date is invalid');

  return true;
};

export default validateArticle;
