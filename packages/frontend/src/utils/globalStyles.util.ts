import styled, { createGlobalStyle } from 'styled-components';
import { device } from './theme.util';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SofiaPro';
        src: url('/fonts/SofiaProMedium.woff2') format('woff2'),
        url('/fonts/SofiaProMedium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }

   @font-face {
        font-family: 'SofiaPro';
        src: url('/fonts/SofaProBold.woff2') format('woff2'),
            url('/fonts/SofaProBold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'SofiaPro';
        src: url('/fonts/SofiaProBold.woff2') format('woff2'),
            url('/fonts/SofiaProBold.woff') format('woff');
        font-weight: 900;
        font-style: normal;
    }


    * {
        margin: 0;
        padding: 0;
        font-family: 'SofiaPro', Arial, Helvetica, sans-serif !important;
        transition: all 0.3s ease 0s;
    }

    button{
        border-top: none;
        border: none;
    }
`;

// #########################
// RESPONSIVE PROPERTIES
// #########################
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
