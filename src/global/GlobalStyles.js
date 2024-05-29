import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'LeferiPoint-SpecialItalicA';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/LeferiPoint-SpecialItalicA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

* {
    box-sizing: border-box;
    font-family:'LeferiPoint-SpecialItalicA'; 
}
`;

export default GlobalStyles;
