// libs
import styled from "styled-components";

const Root = styled.div`
  button, input {
    padding: 2px 4px;
  }
`;

export default function AddSmiles({ ctx }) {
  return (
    <Root>
      <button>add smile</button>
    </Root>
  );
}