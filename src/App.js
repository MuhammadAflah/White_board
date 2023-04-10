import "./App.css";
import { useEffect, useState } from "react";
import { fabric } from "fabric";
import ModeIcon from '@mui/icons-material/Mode';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ClearIcon from '@mui/icons-material/Clear';
import { FormControlLabel, Radio, RadioGroup, Slider } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [canvas, setCanvas] = useState(null);
  const [penColor, setPenColor] = useState("#0052cc");
  const [penSize, setPenSize] = useState(3);
  const [penMode, setPenMode] = useState(true);
  const [isEraserMode, setIsEraserMode] = useState(false);


  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "white",
      selection: false,
    });
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (canvas) {
      if (penMode) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = penSize;
        canvas.freeDrawingBrush.color = penColor;
      } else {
        canvas.isDrawingMode = false;
        canvas.forEachObject((obj) => {
          if (obj.isEraser) {
            obj.visible = true;
          } else {
            obj.visible = false;
          }
        });
      }
      canvas.renderAll();
      if (isEraserMode) {
        canvas.wrapperEl.classList.add("eraser-mode");
      } else {
        canvas.wrapperEl.classList.remove("eraser-mode");
      }
    }
  }, [penMode, penSize, penColor, canvas]);

  function clearCanvas() {
    canvas.clear();
  }

  function togglePenMode() {
    setPenMode(true);
  }

  function toggleEraserMode() {
    if (!canvas) return;
    setIsEraserMode(true);
    setPenMode(true);
    setPenColor(canvas.backgroundColor);
  }

  function setPenColorAndMode(color) {
    setPenColor(color);
    setIsEraserMode(false);
    setPenMode(true);
  }

  const colorOptions = [
    { color: "#000000" },
    { color: "#ff0000" },
    { color: "#0000ff" },
    { color: "#008000" },
    { color: "#800080" },
  ];

  function setPenSizeAndMode(size) {
    setPenSize(size);
    setPenMode(true);
  }

  return (
    <div>
      <div className="toolbar">
        <div className="options">
          <ModeIcon onClick={togglePenMode}
            sx={{
              borderRadius: '50%',
              border: '1px solid #ccc',
              padding: 1,
              color: "white",
              backgroundColor: "green"
            }}
          />
          <div className="color-options-container">
            <RadioGroup
              sx={{ gap: 1, flexWrap: 'wrap', flexDirection: 'row' }}
              value={penColor}
              onChange={(event) => setPenColorAndMode(event.target.value)}
            >
              {colorOptions.map((option) => (
                <FormControlLabel
                  key={option.color}
                  value={option.color}
                  control={<Radio
                    sx={{ width: 24, height: 24, color: option.color }}
                  />}
                />
              ))}
            </RadioGroup>
          </div>
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={penSize}
            onChange={(e) => setPenSizeAndMode(e.target.value)}
            sx={{ width: "20%", color: "black" }}
          />
        </div>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <AutoFixNormalIcon onClick={toggleEraserMode}
            sx={{
              borderRadius: '50%',
              border: '1px solid #ccc',
              padding: 1,
              color: "black",
              backgroundColor: "white",
              marginRight: "2rem"
            }}
          />
          <ClearIcon onClick={clearCanvas}
            sx={{
              borderRadius: '50%',
              border: '1px solid #ccc',
              padding: 1,
              color: "white",
              backgroundColor: "green"
            }}
          />
        </Box>
      </div>
      <hr />
      <canvas id="canvas" />
    </div>
  );
}

export default App;
