import { ObjectType, Field, Int } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { PostEntity } from './Post.entity';
import { CommentEntity } from './Comment.entity';
import { UniEmail } from '../utils/email.util';
import { University } from './types/University.type';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text', { unique: true })
    username!: string;

    @Field()
    @Column('text', { unique: true })
    email!: string;

    @Column('text')
    password!: string;

    @Field({ nullable: true })
    @Column('text', { nullable: true })
    profileImg?: string;

    @Field(() => University)
    @Column('json')
    university!: UniEmail;

    @Field()
    @Column('text')
    universityName!: string;

    @Field(() => [PostEntity])
    @ManyToMany(() => PostEntity, (post: PostEntity) => post.likes, {
        cascade: true,
    })
    @JoinTable()
    likes!: PostEntity[];

    @Field(() => [PostEntity])
    @OneToMany(() => PostEntity, (post: PostEntity) => post.author, {
        cascade: true,
    })
    posts!: PostEntity[];

    @Field(() => [CommentEntity])
    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.author, {
        cascade: true,
    })
    comments!: CommentEntity[];

    @Column('bool', { default: false })
    confirmed!: boolean;

    @Column('int', { default: 0 })
    tokenVersion!: number;

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
