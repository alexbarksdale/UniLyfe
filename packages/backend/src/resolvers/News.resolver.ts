import axios, { AxiosResponse } from 'axios';
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
        const params = {
            q: 'university',
            soryBy: 'relevancy',
            langauge: 'en',
            pageSize: '1',
            apiKey: `${process.env.NEWS_API_KEY}`,
        };

        try {
            const resData: AxiosResponse<NewsResponse> = await axios.get(
                `${this.baseUrl}/everything`,
                {
                    params,
                }
            );

            return resData.data;
        } catch (err) {
            logger.error('Unable to fetch news data', err);
            throw new Error('Unable to fetch news data');
        }
    }
}
