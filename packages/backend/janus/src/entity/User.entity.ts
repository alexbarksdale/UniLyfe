import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column('text', { unique: true })
    email!: string;

    @Column('text')
    password!: string;

    @Column('int', { default: 0 })
    tokenVersion!: number;
}
