import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional} from "class-validator";

export class ArticleDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	id?: string;
	
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
	
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	UserId?: string;
	
	@ApiProperty({ required: false })
	@IsDate()
	@IsOptional()
	createdAt?: Date;
	
	@ApiProperty({ required: false })
	@IsDate()
	@IsOptional()
	updatedAt?: Date;
}
