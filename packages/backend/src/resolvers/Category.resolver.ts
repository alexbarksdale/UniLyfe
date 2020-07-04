import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CategoryEntity } from '../entity/Category.entity';
import { logger } from '../utils/logger.util';

@Resolver()
export class CategoryResolver {
    @Query(() => [CategoryEntity])
    async getCategories(): Promise<CategoryEntity[]> {
        return CategoryEntity.find({ relations: ['posts'] });
    }

    @Mutation(() => Boolean)
    async createCategory(@Arg('name') name: string): Promise<Boolean> {
        if (!name) throw new Error('You must provide a category name');

        const categoryExist = await CategoryEntity.findOne({ where: { name } });
        if (categoryExist) throw new Error('That category already exists!');

        const category = CategoryEntity.create({
            name,
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
