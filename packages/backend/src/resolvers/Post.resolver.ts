import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { PostEntity } from '../entity/Post.entity';
import { UserEntity } from '../entity/User.entity';

@Resolver()
export class PostResolver {
    @Query(() => Boolean)
    test() {
        return true;
    }

    @Mutation(() => Boolean)
    async createPost(
        @Arg('title') title: string,
        @Arg('content') content: string,
        @Arg('email') email: string
    ) {
        if (!title || !content || !email) throw new Error('Missing fields!');

        const postAuthor = await UserEntity.findOne({ where: { email } });
        if (!postAuthor) throw new Error('Unable to find author!');

        // Create new post
        const post = PostEntity.create();

        post.title = title;
        post.content = content;
        post.author = postAuthor;

        try {
            await PostEntity.save(post);
        } catch (err) {
            throw new Error(`Unable to save post! ${err}`);
        }

        return true;
    }
}
