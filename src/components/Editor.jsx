// libs
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: fit-content;

  input:nth-child(1) {
    padding: 0;
  }
  
  input {
    padding: 2px 4px;
  }
`;

export default function Editor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // canvas initialization
    if (canvasRef.current) {
      canvasRef.current.width = 500;
      canvasRef.current.height = 500;
      canvasRef.current.style.backgroundColor = '#fff';
    }
  }, []);

  const uploadImage = (event) => {
    // TODO
  };

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />
      <ControlPanel>
        <input type="file" id="uploadInput" accept="image/*" onChange={uploadImage}/>
        <input type="text" placeholder="Top text"/>
        <input type="text" placeholder="Bottom text"/>
      </ControlPanel>
    </div>
  );
}