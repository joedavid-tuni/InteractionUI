import { useState, useRef, useEffect } from 'react';
import './CaButton2.css';
import { useSelector } from 'react-redux';
import Radius from '../Radius';

const CaButton2 = (props) => {
  const radius = useSelector((state) => state.config.radius.caButton2);
  const ref = useRef(null);
  const caOptions = ["CA 1", "CA 2", "CA 3", "CA 4", "CA 5", "CA 6"];
  const [caIndex, setCaIndex] = useState(0);

  const caButton2ClickHandler = () => {
    let index = caIndex + 1;
    if (index > caOptions.length - 1) {
      index = 0;
    }
    setCaIndex(index);
    props.changeCaIndex(index);
  }
  
  return (
    <div onClick={caButton2ClickHandler} className="ca-button2-container">
      <div ref={ref} className="ca-button2">
        <div className="ca-button2-text">{caOptions[caIndex]}</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default CaButton2;