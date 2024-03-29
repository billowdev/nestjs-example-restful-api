import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator"

export class UserDto {
	@ApiProperty()
	@IsString()
    readonly id: string;
	
	@ApiProperty()
	@IsString()
    readonly name: string;
	
	@ApiProperty()
	@IsString()
    readonly surname: string;
	
	@ApiProperty()
	@IsEmail()
    readonly email: string;
	
	@ApiProperty()
	@IsString()
    readonly password: string;
	
	@ApiProperty()
	@IsString()
	readonly phone: string;
}