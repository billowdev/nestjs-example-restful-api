import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from 'src/constants';
import { ArticleDto } from './dto';
import { Article } from './model';

@Injectable()
export class ArticleService {
	constructor(@Inject(ARTICLE_REPOSITORY) private readonly userRepository: typeof Article) { }

	async create(article: ArticleDto | any): Promise<Article> {
		return await this.userRepository.create<Article>(article);
	}

	async findOneByEmail(email: string): Promise<Article> {
		return await this.userRepository.findOne<Article>({ where: { email } });
	}

	async findOneById(id: number): Promise<Article> {
		return await this.userRepository.findOne<Article>({ where: { id } });
	}
}
