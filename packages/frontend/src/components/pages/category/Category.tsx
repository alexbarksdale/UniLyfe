import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container } from '../../shared-styles/global.styles';
import { Feed } from '../../feeds/Feed';
import { useGetCategoryPostsQuery } from '../../../generated/graphql';
import { setCategory } from '../../../store/actions/navigation.action';

export function Category(): JSX.Element | null {
    const { category } = useParams();
    const dispatch = useDispatch();

    const name: string = category.charAt(0).toUpperCase() + category.slice(1);
    const { data, loading } = useGetCategoryPostsQuery({
        variables: {
            categoryName: name,
        },
    });

    if (loading || typeof data === 'undefined' || !data.getCategoryPosts[0].posts) {
        // TODO: Category doesn't exist display
        return null;
    }

    dispatch(setCategory(category));

    return (
        <Container>
            <Feed feedData={data.getCategoryPosts[0].posts} />
        </Container>
    );
}
