import { ARTICLE_REPOSITORY } from '../../constants';
import { Article } from './article.entity';

export const articleProviders = [
  {
    provide: ARTICLE_REPOSITORY,
    useValue: Article,
  },
];
