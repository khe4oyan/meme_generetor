// libs
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// components
import AddSmiles from "./AddSmiles";

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

const CanvasContainer = styled.div`
  width: fit-content;
  height: fit-content;
  overflow: hidden;
`;

export default function Editor() {
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [ctx, setCtx] = useState(null);

  const [topText, setTopText] = useState("");
  const [topTextColor, setTopTextColor] = useState("#000000");

  const [bottomText, setBottomText] = useState("");
  const [bottomTextColor, setBottomTextColor] = useState("#000000");

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

  // for render in canvas
  useEffect(() => {
    if (ctx) {
      const canvas = canvasRef.current;
      const w = canvas.width;
      const h = canvas.height;

      const addText = (ctx, text, color, w, h) => {
        ctx.fillStyle = color;
        ctx.fillText(text, w, h);
      };

      ctx.clearRect(0, 0, w, h);

      if (img) {
        ctx.drawImage(img, 0, 0);
      }

      const margin = 50;
      ctx.font = "50px Arial";
      ctx.textAlign = "center";

      topText && addText(ctx, topText, topTextColor, w / 2, margin);
      bottomText && addText(ctx, bottomText, bottomTextColor, w / 2, h - margin);
    }
  }, [img, topText, bottomText, topTextColor, bottomTextColor]);

  const onUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
      setImg(img);
    };
  };

  const onTopTextChange = (e) => {
    setTopText(e.target.value);
  };

  const onTopTextColorChange = (e) => {
    setTopTextColor(e.target.value);
  };

  const onTopBottomTextChange = (e) => {
    setBottomText(e.target.value);
  };

  const onTopBottomColorChange = (e) => {
    setBottomTextColor(e.target.value);
  };

  const onDownloadImg = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Получаем данные в формате PNG
    link.download = 'result.png'; // Имя файла
    link.click();
  };

  return (
    <div>
      <CanvasContainer>
        <canvas id="canvas" ref={canvasRef} />
      </CanvasContainer>

      <ControlPanel>
        <input
          type="file"
          id="uploadInput"
          accept="image/*"
          onChange={onUploadImage}
        />

        <button onClick={onDownloadImg}>download</button>
        
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={onTopTextChange}
        />
        <input
          type="color"
          value={topTextColor}
          onChange={onTopTextColorChange}
        />

        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={onTopBottomTextChange}
        />
        <input
          type="color"
          value={bottomTextColor}
          onChange={onTopBottomColorChange}
        />

        <AddSmiles ctx={ctx}/>
      </ControlPanel>
    </div>
  );
}
