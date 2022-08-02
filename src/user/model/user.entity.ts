import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
	Column,
	Table,
	Model,
	DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model {
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
		type: DataType.STRING(150),
        unique: true,
        allowNull: false,
	})
	email: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
        allowNull: false,
	})
	password: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	name: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	surname: string;


	@ApiProperty()
	@Column({
		type: DataType.STRING(10),
	})
	phone: string;
}
