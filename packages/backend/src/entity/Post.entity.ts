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
    ManyToMany,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { CategoryEntity } from './Category.entity';
import { PostType } from './types/post.type';

@ObjectType()
@Entity('posts')
export class PostEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('enum', { enum: PostType })
    type!: PostType;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    thumbnail?: string | null;

    @Field()
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    content!: string;

    @Field(() => [UserEntity])
    @ManyToMany(() => UserEntity, (user: UserEntity) => user.likes)
    likes!: UserEntity[];

    @Field(() => Int)
    @Column('int', { default: 0 })
    views!: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
    author!: UserEntity;

    @Field(() => CategoryEntity)
    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.posts)
    @JoinColumn()
    category!: CategoryEntity;

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
