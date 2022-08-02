import { IsEmail, IsString } from "class-validator"

export class UserDto {
	@IsString()
    readonly id: string;

	@IsString()
    readonly name: string;

	@IsString()
    readonly surname: string;

	@IsEmail()
    readonly email: string;

	@IsString()
    readonly password: string;

	@IsString()
	readonly phone: string;
}