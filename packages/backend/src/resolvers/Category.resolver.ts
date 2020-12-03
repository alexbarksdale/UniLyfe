import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CategoryEntity } from '../entity/Category.entity';
import { logger } from '../utils/logger.util';

@Resolver()
export class CategoryResolver {
    /** getCategories handles fetching all categories. */
    @Query(() => [CategoryEntity])
    async getCategories(): Promise<CategoryEntity[]> {
        const posts = await CategoryEntity.find({ relations: ['posts'] });
        return posts;
    }

    /** getCategoryPosts handles fetching all posts for a given category.
     * @param {string} categoryName The name of the category.
     * */
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
            relations: ['posts', 'posts.author', 'posts.category', 'posts.likes'],
        });

        return posts;
    }

    /** createCategory handles creating a new category.
     * @param {string} name The name of the category.
     * */
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
