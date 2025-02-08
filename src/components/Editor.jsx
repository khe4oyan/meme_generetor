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
  const [ctx, setCtx] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    // canvas initialization
    if (canvasRef.current) {
      const cnv = canvasRef.current;
      cnv.width = 500;
      cnv.height = 500;
      cnv.style.backgroundColor = "#fff";

      const ctx = cnv.getContext("2d");
      setCtx(ctx);
    }
  }, []);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />

      <ControlPanel>
        <input
          type="file"
          id="uploadInput"
          accept="image/*"
          onChange={uploadImage}
        />
        
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />

        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </ControlPanel>
    </div>
  );
}
