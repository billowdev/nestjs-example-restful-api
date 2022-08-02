import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async validateUser(email: string, pass: string) {
		console.log("Validate")
        // find if user exist with this email
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
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

	public async signin(user) {
		const token = await this.generateToken(user);
		delete user.password
		return { user, token };
	}

	public async signup(user) {
		const hassPassword = await this.hashPassword(user.password);
		const result = await this.userService.create({ ...user, password: hassPassword });
		delete result['dataValues'].password
		const payload = {
			email: result['dataValues'].email,
			id: result['dataValues'].id
		}
		const token = await this.generateToken(payload);
		return { user: result, token };
	}
}
