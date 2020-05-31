import { Field, Int, ObjectType } from 'type-graphql';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@ObjectType()
@Entity('posts')
export class PostEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
    @JoinColumn()
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
