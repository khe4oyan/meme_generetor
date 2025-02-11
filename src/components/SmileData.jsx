// libs
import styled from "styled-components";

const Root = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;  

export default function SmileData({ data, ind, setOptions, removeSmile }) {
  const setNewX = (e) => {
    setOptions(ind, e.target.value, data.posY);
  };

  const setNewY = (e) => {
    setOptions(ind, data.posX, e.target.value);
  };

  const onRemoveSmile = () => {
    removeSmile(ind);
  };

  return (
    <Root>
      <p>Smile: {ind}</p>
      <input type="number" value={data.posX} onChange={setNewX}/>
      <input type="number" value={data.posY} onChange={setNewY}/>
      <button onClick={onRemoveSmile}>remove</button>
    </Root>
  );
}