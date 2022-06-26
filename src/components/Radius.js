import { useEffect, useState } from 'react';
import './Radius.css';

const Radius = ({radius, parentElement}) => {  
  const [r, setR] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [c, setC] = useState("default");

  useEffect(() => {
    if (radius != undefined && parentElement != null) {
      let b = getComputedStyle(parentElement).borderWidth;
      b = parseInt(b.substring(0, b.length - 2))
      let tempR = getComputedStyle(parentElement).borderRadius;

      setR(parseInt(tempR.substring(0, tempR.length - 2)));
      setW(parentElement.clientWidth + radius + b);
      setH(parentElement.clientHeight + radius + b);
      setC(getComputedStyle(parentElement).cursor);
    } else {
      setR(0);
      setW(0);
      setH(0);
      setC("default");
    }
  }, [radius, parentElement, parentElement != null && getComputedStyle(parentElement).cursor])

  return (
    <div className="radius" style={{
      width: w + "px",
      height: h + "px",
      borderRadius: r + "px",
      cursor: c
    }}></div>    
  )
}

export default Radius;