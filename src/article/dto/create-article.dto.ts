import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateArticleDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	text: string;
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string;
}
