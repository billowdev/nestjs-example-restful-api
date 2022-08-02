import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
	Column,
	Table,
	Model,
	DataType,
} from 'sequelize-typescript';

@Table
export class Article extends Model {
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
}
