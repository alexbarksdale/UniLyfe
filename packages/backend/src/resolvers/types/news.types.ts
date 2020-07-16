import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType({
    description: "NewsArticle 'source' types",
})
export class NewsSource {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field()
    name!: string;
}

@ObjectType({
    description: "NewsResponse 'articles' types",
})
export class NewsArticle {
    @Field(() => NewsSource)
    source!: NewsSource;

    @Field({ nullable: true })
    author?: string;

    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    url!: string;

    @Field()
    urlToImage!: string;

    @Field()
    publishedAt!: string;

    @Field({ nullable: true })
    content?: string;
}

@ObjectType({
    description: 'Response from NewsApi.org',
})
export class NewsData {
    @Field()
    status!: string;

    @Field(() => Int)
    totalResults!: number;

    @Field(() => [NewsArticle])
    articles?: Array<NewsArticle>;
}

@ObjectType({
    description: 'Axios response for NewsApi.org',
})
export class NewsResponse {
    @Field()
    status!: string;

    @Field(() => Int)
    totalResults!: number;

    @Field(() => [NewsArticle])
    articles?: Array<NewsArticle>;
}
