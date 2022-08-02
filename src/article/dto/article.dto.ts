import { IsString, IsDate} from "class-validator";

export class ArticleDto {
	@IsString()
	id: string;

	@IsString()
	title: string;

	@IsString()
	text: string;

	@IsString()
	type: string;

	@IsString()
	UserId: string;

	@IsDate()
	createdAt: Date;
	
	@IsDate()
	updatedAt: Date;
}
