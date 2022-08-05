
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateArticleDto {

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	title?: string;
	
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	text?: string;
	
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	type?: string;
}
