// libs
import styled from "styled-components";

// compoenents
import SmileData from "./SmileData";

const Root = styled.div`
  button, input {
    padding: 2px 4px;
  }
`;

export default function AddSmiles({ ctx, cnv, smiles, setSmiles }) {
  const onAddSmile = () => {
    setSmiles(prev => [...prev, {
      posX: cnv?.width / 2,
      posY: cnv?.height / 2,
    }]);
  }

  const setOptions = (ind, x, y) => {
    setSmiles(prev => {
      const newPrev = [...prev];

      const data = prev[ind];
      data.posX = x;
      data.posY = y;

      return newPrev;
    });
  };

  const removeSmile = (ind) => {
    setSmiles(prev => {
      const newPrev = prev.filter((item, i) => i !== ind);
      return newPrev;
    });
  }

  return (
    <Root>
      <button onClick={onAddSmile}>add smile</button>

      {smiles.map((smileData,i ) =>
        <SmileData 
          data={smileData} 
          ind={i}
          setOptions={setOptions}
          removeSmile={removeSmile}
          key={i}
        />
      )}
    </Root>
  );
}