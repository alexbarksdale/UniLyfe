import styled, { createGlobalStyle } from 'styled-components';
import { device } from './theme.util';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'ProximaNova';
        src: url('/fonts/ProximaNova-Semibold.woff2') format('woff2'),
        url('/fonts/ProximaNova-Semibold.woff') format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'ProximaNova';
        src: url('/fonts/ProximaNova-Bold.woff2') format('woff2'),
        url('/fonts/ProximaNova-Bold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'ProximaNova';
        src: url('/fonts/ProximaNova-Extrabld.woff2') format('woff2'),
        url('/fonts/ProximaNova-Extrabld.woff') format('woff');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: 'ProximaNova', Arial, Helvetica, sans-serif !important;
        transition: all 0.3s ease 0s;
    }

    button {
        cursor: pointer;
        border-top: none;
        border: none;
    }
`;

export const Container = styled.div`
    width: 1375px;
    margin: 0px auto;
    @media ${device.laptopM} {
        width: 1105px;
    }
    @media ${device.laptopS} {
        width: 905px;
    }
    @media ${device.tabletM} {
        width: 726px;
    }
    @media ${device.tabletL} {
        width: 90%;
    }
`;

export const CategoryTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.gray800};
    margin-bottom: 10px;
`;
