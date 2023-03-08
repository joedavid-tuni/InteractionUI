import './Canvas.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Canvas = () => { 
  const blinkingState = useSelector((state) => state.blinking.blinkingState);
  const canvasRef = useRef(null);
  const polygons = useSelector((state) => state.canvas.polygons)
  
  useEffect(() => {
    refreshCanvas();
  }, [blinkingState]);

  const printPolygon = (polygon) => {
    let points = polygon.points;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = polygon.color;
    console.log("Coloristo: ", polygon.color )
    ctx.beginPath();

    let i = 0;
    for (let temp of points.values()) {
      i++;
      if (i == 1) {
        ctx.moveTo(temp.x, temp.y);
      } else {
        ctx.lineTo(temp.x, temp.y);
      }
    }

    ctx.closePath();
    ctx.fill();

    return ctx;
  }

  const refreshCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let polygon of polygons) {
      if (polygon.mode == "fixed" || (polygon.mode == "blinking" && blinkingState)) {
        printPolygon(polygon);
      }
    }
  }
 
  return (
    <div>
      <canvas id="canvas" ref={canvasRef} width="1920px" height="1080px"></canvas>
    </div>
  )
}

export default Canvas;