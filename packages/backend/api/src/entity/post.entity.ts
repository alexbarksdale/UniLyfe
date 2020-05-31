import { Field, Int, ObjectType } from 'type-graphql';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column('text')
    author!: string;

    @Field(() => String)
    @Column('text')
    title!: string;

    @Field(() => String)
    @Column('text')
    content!: string;

    @Field(() => Int)
    @Column('int')
    upVotes!: number;

    @Field(() => Int)
    @Column('int')
    downVotes!: number;

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
