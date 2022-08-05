import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ArticleService } from './article.service';
import { ArticleDto, CreateArticleDto } from './dto';
import { UpdateArticleDto } from './dto/update-article.dto';


@ApiTags('article')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) { }

	@ApiResponse({ type: ArticleDto, isArray: true })
	@Get()
	findAllArticle() {
		return this.articleService.findAllArticle()
	}

	@UseGuards(JwtGuard)
	@ApiResponse({ type: ArticleDto })
	@Get('/byid/:id')
	findOne(@Param('id') id: string) {
		return this.articleService.findOneById(id)
	}

	@UseGuards(JwtGuard)
	@Get('/user')
	@ApiResponse({ type: ArticleDto, isArray: true })
	findByUserId(
		@GetUser('id') userId: string
	) {
		return this.articleService.findAllByUserId(userId)
	}

	@ApiResponse({ type: ArticleDto })
	@UseGuards(JwtGuard)
	@Post()
	create(
		@Body() dto: CreateArticleDto,
		@GetUser('id') userId: string
	) {
		return this.articleService.create(userId, dto)
	}

	@ApiOkResponse({ description: 'The record has been successfully updated.' })
	@ApiBadRequestResponse()
	@UseGuards(JwtGuard)
	@Patch(':id')
	update(
		@Body() dto: UpdateArticleDto,
		@GetUser('id') userId: string,
		@Param('id') articleId: string
	) {
		return this.articleService.update(userId, articleId, dto)
	}

	@ApiNoContentResponse({ description: 'The record has been successfully deleted.' })
	@ApiBadRequestResponse()
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	@Delete(':id')
	delete(
		@GetUser('id') userId: string,
		@Param('id') articleId: string
	) {
		return this.articleService.delete(userId, articleId)
	}
}
