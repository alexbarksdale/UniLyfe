import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setBrowsing, setCategory } from '../../store/actions/navigation.action';
import { NavigationTypes } from '../../store/types/navigation.types';
import { useGetCategoriesQuery, GetCategoriesQuery } from '../../generated/graphql';

type StyleProps = {
    fontSize?: number;
};

const StyledLink = styled(Link)`
    font-size: ${(props: StyleProps) => props.fontSize ?? '15px'};
    font-weight: 600;
    color: ${(props) => props.theme.gray600};
    text-decoration: none;
    transition: all 0.3s ease 0s;
    &:hover {
        opacity: 0.8;
    }
`;

export function NavItems(): JSX.Element | null {
    const { data, loading } = useGetCategoriesQuery();

    const dispatch = useDispatch();
    const setStateCategory = (category?: string): void => {
        dispatch(setBrowsing(true));
        dispatch(setCategory(category, NavigationTypes.SET_UNILYFE_CATEGORY));
    };

    if (loading || !data) return null;

    const renderCategories = (categories: GetCategoriesQuery): JSX.Element[] => {
        return categories.getCategories.map((category) => {
            return (
                <li key={category.name}>
                    <StyledLink
                        to={`/category/${category.name}`}
                        onClick={() =>
                            dispatch(
                                setCategory(
                                    category.name,
                                    NavigationTypes.SET_FORUM_CATEGORY
                                )
                            )
                        }
                    >
                        {category.name}
                    </StyledLink>
                </li>
            );
        });
    };

    return (
        <>
            <li>
                <StyledLink to='/' onClick={() => setStateCategory('')}>
                    Home
                </StyledLink>
            </li>
            {renderCategories(data)}
        </>
    );
}
