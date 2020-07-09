import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CategoryEntity } from '../entity/Category.entity';
import { logger } from '../utils/logger.util';

@Resolver()
export class CategoryResolver {
    @Query(() => [CategoryEntity])
    async getCategories(): Promise<CategoryEntity[]> {
        return CategoryEntity.find({ relations: ['posts'] });
    }

    @Query(() => [CategoryEntity])
    async getCategoryPosts(
        @Arg('categoryName') categoryName: string
    ): Promise<CategoryEntity[]> {
        if (!categoryName) throw new Error('You must provide a category name');

        const categoryExist = await CategoryEntity.findOne({
            where: { name: categoryName },
        });

        if (!categoryExist) throw new Error('Unable to find category!');

        const posts = await CategoryEntity.find({
            where: { name: categoryName },
            relations: ['posts', 'posts.author', 'posts.category'],
        });

        return posts;
    }

    @Mutation(() => Boolean)
    async createCategory(@Arg('name') name: string): Promise<Boolean> {
        if (!name) throw new Error('You must provide a category name');

        const categoryExist = await CategoryEntity.findOne({ where: { name } });
        if (categoryExist) throw new Error('That category already exists!');

        const categoryName = name.charAt(0).toUpperCase() + name.slice(1);
        const category = CategoryEntity.create({
            name: categoryName,
        });

        try {
            await CategoryEntity.save(category);
        } catch (err) {
            logger.error('Unable to save category', err);
            throw new Error('Unable to save category');
        }

        return true;
    }
}
