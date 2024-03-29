import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities';
import { UserDto } from './dto';
import { USER_REPOSITORY } from '../@core/constants';

@Injectable()
export class UserService {
	constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

	public async create(user: UserDto | any): Promise<User> {
		try {
			return await this.userRepository.create<User>(user);
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async findOneByEmail(email: string): Promise<User> {
		try {
			return await this.userRepository.findOne<User>({
				where: { email },
				attributes: { include: ['id', 'email', 'password'] }
			});
		} catch (error) {
			throw new BadRequestException()
		}
	}

	public async findOneById(id: any): Promise<User> {
		try {
			return await this.userRepository.findOne<User>({
				where: { id },
				attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
			});
		} catch (error) {
			throw new BadRequestException()
		}

	}

}
