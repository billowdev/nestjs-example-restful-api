import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignDto } from './dto';
import { UserIsExist } from './guard/userIsExist.guard';
import { LocalGuard } from './guard/local.guard';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
		) { }

	@ApiResponse({type: SignDto})
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(@Body() dto: AuthDto): Promise<{ user: any; token: string; }> {
		return this.authService.signin(dto);
	}

	@UseGuards(UserIsExist)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@UseGuards(JwtGuard)
	@Get('session')
	session(
		@GetUser('id') userId: string,
		) {
		return this.authService.session(userId)
	}



}
