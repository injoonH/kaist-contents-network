import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    background-color: #212121;
  }

  * {
    margin: 0;
    box-sizing: border-box;
    padding: 0;

    font-family: "Noto Sans KR", Inter, Avenir, Helvetica, Arial, sans-serif;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  a {
    cursor: pointer;

    text-decoration: inherit;

    &:focus {
      outline: none;
    }
  }

  button {
    border: none;

    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }

  input {
    border: none;
    outline: none;

    background: none;
  }
`;
