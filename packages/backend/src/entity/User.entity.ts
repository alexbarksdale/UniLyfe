import { ObjectType, Field, Int } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { PostEntity } from './Post.entity';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column('text', { unique: true })
    username!: string;

    @Field(() => String)
    @Column('text', { unique: true })
    email!: string;

    @Column('text')
    password!: string;

    @Field(() => PostEntity)
    @OneToMany(() => PostEntity, (post: PostEntity) => post.author, { cascade: true })
    posts!: Array<PostEntity>;

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
