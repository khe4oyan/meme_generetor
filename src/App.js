// libs
import styled, {createGlobalStyle} from "styled-components";

// components
import Editor from './components/Editor';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  body {
    min-height: 100dvh;
  }
`;

const AppStyles = styled.div`
  padding: 10px;
`;

function App() {
  return (
    <>
      <AppStyles>
        <Editor />
      </AppStyles>
      <GlobalStyles />
    </>
  );
}

export default App;