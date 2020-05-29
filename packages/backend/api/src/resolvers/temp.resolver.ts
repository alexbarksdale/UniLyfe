import { Resolver, Query } from 'type-graphql';

@Resolver()
export class TempResolver {
    @Query(() => String)
    temp() {
        return 'hi';
    }
}
