import fetch from 'node-fetch';
import { Resolver, Query } from 'type-graphql';

import { NewsResponse } from './types/news.types';
import { logger } from '../utils/logger.util';

@Resolver()
export class NewsResolver {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'http://newsapi.org/v2';
    }

    @Query(() => NewsResponse)
    async getUniNews(): Promise<NewsResponse> {
        try {
            const res = await fetch(
                `${this.baseUrl}/everything?q=university&sortBy=relevancy&language=en&pageSize=4&apiKey=${process.env.NEWS_API_KEY}`,
                { method: 'GET' }
            );
            const resData = await res.json();

            // console.log(resData);
            // resData.articles.forEach((item: any) => {
            //     console.log(item.source);
            // });
            return resData;
        } catch (err) {
            logger.error('Unable to fetch news data', err);
            throw new Error('Unable to fetch news data');
        }
    }
}
