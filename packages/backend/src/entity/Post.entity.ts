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
import { CategoryEntity } from './Category.entity';

@ObjectType()
@Entity('posts')
export class PostEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    content!: string;

    @Field(() => Int)
    @Column('int', { default: 0 })
    likes!: number;

    @Field(() => Int)
    @Column('int', { default: 0 })
    views!: number;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
    @JoinColumn()
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
