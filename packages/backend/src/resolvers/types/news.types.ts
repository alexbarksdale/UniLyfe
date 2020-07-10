import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType({
    description: "NewsArticle 'source' types",
})
export class NewsSource {
    @Field({ nullable: true })
    id!: string;

    @Field()
    name!: string;
}

@ObjectType({
    description: "NewsResponse 'articles' types",
})
export class NewsArticle {
    @Field(() => NewsSource)
    source!: {
        id: string;
        name: string;
    };

    @Field({ nullable: true })
    author!: string;

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
    content!: string;
}

@ObjectType({
    description: 'Response from NewsApi.org',
})
export class NewsResponse {
    @Field()
    status!: string;

    @Field(() => Int)
    totalResults!: number;

    @Field(() => NewsArticle)
    articles!: Array<NewsArticle>;
}
