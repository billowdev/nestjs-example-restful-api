import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserIsExist } from './guard/userIsExist.guard';
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }
	
	// @HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard('local'))
	@Post('signin')
	signin(@Body() dto: AuthDto): Promise<{ user: any; token: string; }> {
		return this.authService.signin(dto);
	}

	@UseGuards(UserIsExist)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}
	


}
