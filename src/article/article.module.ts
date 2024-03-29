import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './entities';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ...articleProviders]
})
export class ArticleModule {}
