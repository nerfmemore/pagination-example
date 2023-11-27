import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-size: 16px;
    }

    a {
        color: white;
    }
`;

export default GlobalStyle;