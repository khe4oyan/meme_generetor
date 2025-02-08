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
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (img) {
        ctx.drawImage(img, 0, 0);
      }

      const margin = 50;
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.fillText(topText, w / 2, margin);
      ctx.fillText(bottomText, w / 2, h - margin);
    }
  }, [img, topText, bottomText]);

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
  }

  const onTopBottomChange = (e) => {
    setBottomText(e.target.value);
  }

  const onDownloadImg = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Получаем данные в формате PNG
    link.download = 'result.png'; // Имя файла
    link.click();
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

        <button onClick={onDownloadImg}>download</button>
        
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
