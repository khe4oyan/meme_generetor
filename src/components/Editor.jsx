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
  const [img, setImg] = useState(null);
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

  useEffect(() => {
    if (ctx) {
      const canvas = canvasRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img) {
        ctx.drawImage(img, 0, 0);
      }

      ctx.font = "50px Arial";
      ctx.fillText(topText, 10, 80);
      ctx.fillText(bottomText, 10, 300);
    }
  }, [img, topText, bottomText]);

  const onUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImg(img);
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
    };
  };

  const onTopTextChange = (e) => {
    setTopText(e.target.value);
  }
  const onTopBottomChange = (e) => {
    setBottomText(e.target.value);
  }

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />

      <ControlPanel>
        <input
          type="file"
          id="uploadInput"
          accept="image/*"
          onChange={onUploadImage}
        />
        
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={onTopTextChange}
        />

        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={onTopBottomChange}
        />
      </ControlPanel>
    </div>
  );
}
