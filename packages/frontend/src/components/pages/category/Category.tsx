import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container } from '../../shared-styles/global.styles';
import { Feed } from '../../feeds/Feed';
import { useGetCategoryPostsQuery } from '../../../generated/graphql';
import { setCategory } from '../../../store/actions/navigation.action';
import { NavigationTypes } from '../../../store/types/navigation.types';
import { StoreState } from '../../../store/reducers/main.reducer';

export function Category(): JSX.Element | null {
    const dispatch = useDispatch();
    const forumCategory = useSelector(
        (state: StoreState) => state.navigationReducer.category.forum
    );

    const { category } = useParams();
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

    if (!forumCategory) {
        dispatch(setCategory(category, NavigationTypes.SET_FORUM_CATEGORY));
    }

    return (
        <Container>
            <Feed feedData={data.getCategoryPosts[0].posts} />
        </Container>
    );
}
