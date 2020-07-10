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
                `http://newsapi.org/v2/everything?q=university&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`,
                { method: 'GET' }
            );
            const resData = await res.json();

            console.log(resData);
            resData.articles.forEach((item: any) => {
                console.log(item.source);
            });
            return resData;
        } catch (err) {
            logger.error('Unable to fetch news data', err);
            throw new Error('Unable to fetch news data');
        }
    }
}
