import fetch from 'node-fetch';
import { Resolver, Query } from 'type-graphql';

import { NewsResponse } from './types/news.types';
import { logger } from '../utils/logger.util';

@Resolver()
export class NewsResolver {
    @Query(() => NewsResponse)
    async getNews(): Promise<NewsResponse> {
        try {
            const res = await fetch(
                `http://newsapi.org/v2/everything?q=university&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`,
                { method: 'GET' }
            );
            return res.json();
        } catch (err) {
            logger.error('Unable to fetch news data', err);
            throw new Error('Unable to fetch news data');
        }
    }
}
