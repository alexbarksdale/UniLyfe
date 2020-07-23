import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../utils/theme.util';

type StyleProps = {
    big?: string; // Used to position elements in OurPicks.tsx
    responsive?: boolean; // Used to make PostHeader responsive adjustments.
    postView?: boolean; // Changes properties when the component is in PostView.tsx
    bgUrl?: string; // Determines if a background url was passed in.
    size?: number; // Pass in a desired font size through props.
};

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props: StyleProps) => (props.big ? '115px' : '94px')};
    padding: 15px;
    margin-right: ${(props: StyleProps) => (props.big ? undefined : '15px')};
    width: ${(props: StyleProps) => (props.big ? undefined : '94px')};
    margin-bottom: ${(props: StyleProps) => (props.big ? '15px' : undefined)};
    transition: all 0.3s ease 0s;
    background: url(${({ bgUrl }: StyleProps) => bgUrl});
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.gray300};

    svg {
        color: ${(props) => props.theme.gray500};
        font-size: 45px;
    }

    &:hover {
        opacity: ${({ bgUrl }: StyleProps) => (bgUrl ? '.8' : null)};
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
    width: 100%;

    a {
        text-decoration: none;
        transition: all 0.3s ease 0s;
        &:hover {
            opacity: 0.8;
        }
        p {
            font-size: 16px;
            font-weight: 500;
            color: ${(props) => props.theme.gray500};
        }
    }

    h1 {
        font-size: 19px;
        font-weight: 600;
        margin-bottom: 5px;
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
        span,
        button {
            display: flex;
            font-size: ${(props: StyleProps) => (props.postView ? '16px' : '14px')};
            font-weight: 500;
            color: ${(props) => props.theme.gray600};
            outline: none;
            background-color: transparent;
            transition: all 0.3s ease 0s;

            svg {
                font-size: ${(props: StyleProps) => (props.postView ? '14px' : '13px')};
                margin-right: 4px;
            }

            &:hover {
                color: ${(props) => props.theme.gray450};
            }
        }
    }
`;

export const PostDate = styled.p`
    font-size: ${({ size }: StyleProps) => (size ? `${size}px` : '13px')} !important;
    font-family: 'SFMono', Arial, Helvetica, sans-serif !important;
    letter-spacing: -0.5px;
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
