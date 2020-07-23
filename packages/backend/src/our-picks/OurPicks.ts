import cron from 'cron';

import { PostEntity } from '../entity/Post.entity';
import { logger } from '../utils/logger.util';

export class OurPicks {
    public posts: PostEntity[] = [];

    constructor() {
        this.init();
    }

    private async init() {
        try {
            this.posts = await this.queryPosts();
            this.startQuerySchedule();
        } catch (err) {
            logger.error('Unable to init posts!', err);
            throw new Error('Unable to init posts!');
        }
    }

    private startQuerySchedule(): void {
        new cron.CronJob('1 * * * * *', async () => {
            this.posts = await this.queryPosts();
        }).start();
    }

    private async queryPosts(): Promise<PostEntity[]> {
        let posts: PostEntity[];
        try {
            posts = await PostEntity.createQueryBuilder('posts')
                .leftJoinAndSelect('posts.author', 'author')
                .leftJoinAndSelect('posts.category', 'category')
                .leftJoinAndSelect('posts.likes', 'likes')
                .orderBy('RANDOM()')
                .limit(3)
                .getMany();
        } catch (err) {
            logger.error('Unable to query posts', err);
            throw new Error('Unable to query posts');
        }
        return posts;
    }
}
