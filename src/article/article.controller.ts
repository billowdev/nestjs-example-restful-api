import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('article')
export class ArticleController {
	@Get()
	findAll(): string {
		return 'FIND ALL'
	}

	@Get(':id')
	findOne(@Param('id') id: number): string {
		return 'FIND ONE '
	}
}
