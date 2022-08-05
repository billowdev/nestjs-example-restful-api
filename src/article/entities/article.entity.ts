import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
	Column,
	Table,
	Model,
	DataType,
	ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/entities';

@Table({
	tableName: 'articles',
})
export class Article extends Model<Article> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	id: string

	@ApiProperty()
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(500),
		allowNull: false,
	})
	text: string;

	@ApiProperty()
	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
	})
	user_id: string
}
