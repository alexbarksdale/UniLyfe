import { ObjectType, Field, Int } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
@ObjectType()
export class CommentEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text')
    author!: string;

    @Field()
    @Column('text')
    content!: string;

    @Field(() => Date)
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @Field(() => Date)
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;
}
