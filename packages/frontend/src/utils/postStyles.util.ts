import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from './theme.util';

type StyleProps = {
    big?: boolean; // Used to position elements in 'Our Picks'
    responsive?: boolean;
};

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props: StyleProps) => (props.big ? '115px' : '94px')};
    padding: 15px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.gray300};
    margin-right: ${(props: StyleProps) => (props.big ? undefined : '15px')};
    width: ${(props: StyleProps) => (props.big ? undefined : '94px')};
    margin-bottom: ${(props: StyleProps) => (props.big ? '15px' : undefined)};
    svg {
        color: ${(props) => props.theme.gray500};
        font-size: 45px;
    }

    &:hover {
        background-color: ${(props) => props.theme.gray200};
    }

    @media ${device.mobileL} {
        display: ${(props) => (props.responsive ? 'none !important' : 'flex')};
    }

    @media ${device.mobileXS} {
        display: ${(props) => (props.big ? 'flex' : 'none')};
    }
`;
export const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
        text-decoration: none;
        &:hover {
            opacity: 0.8;
        }
    }

    h1 {
        font-size: 19px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    p {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

export const PostInfoBar = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 11px;

    p {
        font-weight: 500;
        color: ${(props) => props.theme.gray400};
    }

    span {
        margin: 0px 8px;
    }
`;

export const PostStats = styled.ul`
    display: flex;
    flex: 1;

    li {
        display: flex;
        margin-right: 9px;

        a,
        button {
            display: flex;
            font-size: 14px;
            color: ${(props) => props.theme.gray600};
            transition: 0s;
            background-color: transparent;

            svg {
                font-size: 13px;
                margin-right: 4px;
            }

            &:hover {
                color: ${(props) => props.theme.gray450};
                transition: 0s;
            }
        }
    }
`;

export const CategoryLink = styled(Link)`
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    grid-gap: 15px;
    margin-bottom: 5px;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`;

export const UserLink = styled(Link)`
    font-weight: 500;
    text-decoration: none;
    flex: ${(props: StyleProps) => (props.big ? 1 : 'none')};
    color: ${(props) => props.theme.gray600};

    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`;
