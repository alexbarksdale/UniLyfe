import styled, { createGlobalStyle } from 'styled-components';
import { device } from '../../utils/theme.util';

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

    @font-face {
        font-family: 'SFMono';
        src: url('/fonts/SFMono-Medium.woff2') format('woff2'),
            url('/fonts/SFMono-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: 'ProximaNova', Arial, Helvetica, sans-serif !important;
    }

    button {
        cursor: pointer;
        border-top: none;
        border: none;
    }
    
`;

export const Container = styled.div`
    width: 1105px;
    margin: 0px auto;
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

export const TwoOneGrid = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 2fr 1fr;

    @media (max-width: 902px) {
        grid-template-columns: 1fr;
    }
`;

export const CardContainer = `
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 26px 19px;
    margin: 65px 20px 65px 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
    animation: blink 3s linear infinite;
    background-color: #fff;

    @keyframes blink {
        0% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
        50% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.08);
        }
        100% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
    }

    @-webkit-keyframes blink {
        0% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
        50% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.08);
        }
        100% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
    }
`;
