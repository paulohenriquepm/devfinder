import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
  @import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`;
