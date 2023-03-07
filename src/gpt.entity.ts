import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
} from 'sequelize-typescript';

@Table({
  tableName: 'gpt',
  timestamps: false,
})
export class GptEntity extends Model<GptEntity> {
  @Column({
    field: 'id',
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: 'gptid',
  })
  id: number;

  @Column({
    field: 'keyword',
    type: DataType.STRING(32),
    allowNull: false,
    comment: 'gptkeyword',
  })
  keyword: string;

  @Column({
    field: 'chat_result',
    type: DataType.STRING(256),
    allowNull: false,
    comment: 'gpt chat result',
  })
  chatResult: string;
}
