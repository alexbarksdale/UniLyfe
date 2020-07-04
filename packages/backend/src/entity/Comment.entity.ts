import { ObjectType, Field, Int } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

// TODO: Like system?
@ObjectType()
@Entity('comments')
export class CommentEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int)
    @Column('integer')
    postId!: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
    @JoinColumn()
    author!: UserEntity;

    @Field()
    @Column('text')
    content!: string;

    @Field(() => Int, { nullable: true })
    @Column('integer', { nullable: true })
    replyId!: number;

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
