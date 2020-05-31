import {} from 'type-graphql';
import { Entity, BaseEntity } from 'typeorm';


@Entity('posts')
export class Post extends BaseEntity
