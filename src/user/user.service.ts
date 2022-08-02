import { Inject, Injectable } from '@nestjs/common';
import { User } from './model';
import { UserDto } from './dto';
import { USER_REPOSITORY } from '../constants';

@Injectable()
export class UserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

	async create(user: UserDto | any): Promise<User> {
		return await this.userRepository.create<User>(user);
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userRepository.findOne<User>({ where: { email } });
	}

	async findOneById(id: number): Promise<User> {
		return await this.userRepository.findOne<User>({ where: { id } });
	}
}
