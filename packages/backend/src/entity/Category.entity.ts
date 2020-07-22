import { BaseEntity, Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { PostEntity } from './Post.entity';

@ObjectType()
@Entity('category')
export class CategoryEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text')
    name!: String;

    @Field(() => [PostEntity], { nullable: true })
    @OneToMany(() => PostEntity, (post: PostEntity) => post.category, { cascade: true })
    posts?: PostEntity[];
}
