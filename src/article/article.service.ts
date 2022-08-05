import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from 'src/@core/constants';
import { ArticleDto, CreateArticleDto } from './dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities';

@Injectable()
export class ArticleService {
	constructor(@Inject(ARTICLE_REPOSITORY) private readonly articleRepository: typeof Article) { }

	public async findAllArticle(): Promise<ArticleDto[]> {
		try {
			return await this.articleRepository.findAll<Article>();
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async findOneById(id: string): Promise<ArticleDto> {
		try {
			return await this.articleRepository.findOne<Article>({
				where: { id }
			})
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async findAllByUserId(user_id: string): Promise<ArticleDto[]> {
		try {
			return await this.articleRepository.findAll<Article>({
				where: { user_id }
			})
		} catch (error) {
			throw new BadRequestException()
		}

	}

	public async create(user_id: string, dto: CreateArticleDto | any): Promise<ArticleDto> {
		try {
			const article = await this.articleRepository.create<Article>({
				user_id,
				...dto
			});
			return article
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async update(
		user_id: string,
		articleId: string,
		dto: UpdateArticleDto
	): Promise<number[]> {
		try {
			const article = await this.articleRepository.findByPk(articleId)
			if (!article || article.user_id !== user_id)
				throw new ForbiddenException('Access to resources denied')
			return this.articleRepository.update(
				{ ...dto },
				{ where: { id: articleId } }
			)
		} catch (error) {
			if (error.name === 'SequelizeDatabaseError') {
				throw new ForbiddenException('Access to resources denied')
			} else {
				throw new BadRequestException()
			}
		}
	}

	public async delete(
		user_id: string,
		articleId: string): Promise<void> {
		try {
			const article = await this.articleRepository.findByPk(articleId)

			if (!article || article.user_id !== user_id)
				throw new ForbiddenException('Access to resources denied')
			await this.articleRepository.destroy({
				where: {
					id: articleId
				}
			})
		} catch (error) {
			throw new ForbiddenException('Access to resources denied')
		}
	}


}
