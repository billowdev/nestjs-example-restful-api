import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from './dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	public async validateUser(email: string, pass: string) {
		const user = await this.userService.findOneByEmail(email);
		if (!user) {
			return null;
		}

		const match = await this.comparePassword(pass, user.password);
		if (!match) {
			return null;
		}
		const result = user['dataValues']
		delete result.password
		return result;
	}

	private async generateToken(user) {
		const token = await this.jwtService.signAsync(user);
		return token
	}

	private async hashPassword(password) {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}

	private async comparePassword(password, dbPassword) {
		const match = await bcrypt.compare(password, dbPassword);
		return match;
	}

	public async signin(user): Promise<SignDto> {
		try {
			const { id, email } = await this.userService.findOneByEmail(user.email)
			delete user.password
			const token = await this.generateToken({ id, email });
			const resp = { user: { id, ...user }, token }
			return resp
		} catch (error) {
			throw new BadRequestException()
		}

	}

	public async session(id: any): Promise<any> {
		try {
			const user = await this.userService.findOneById(id);
			if (!user)
				throw new ForbiddenException('Unauthorized')

			const token = await this.generateToken({ ...user })
			return { user, token };
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async signup(user): Promise<SignDto> {
		try {
			const hassPassword = await this.hashPassword(user.password);
			const result = await this.userService.create({ ...user, password: hassPassword });
			delete result['dataValues'].password
			const payload = {
				email: result['dataValues'].email,
				id: result['dataValues'].id
			}
			const token = await this.generateToken(payload);
			return { user: result, token };
		} catch (error) {
			throw new BadRequestException()
		}

	}
}
