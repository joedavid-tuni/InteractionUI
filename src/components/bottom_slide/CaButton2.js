import { useState, useRef, useEffect } from 'react';
import './CaButton2.css';
import { useSelector } from 'react-redux';
import Radius from '../Radius';
let index = 0;
const CaButton2 = (props) => {
  const radius = useSelector((state) => state.config.radius.caButton2);
  const ref = useRef(null);
  const protocolOptions = ["Propose", "Request", "Inform", "Cancel"];
  const [protocol, setProtocol] = useState("");
  

  const caButton2ClickHandler = () => {
    
    setProtocol(protocolOptions[index % protocolOptions.length]);
    props.changeProtocol(protocolOptions[index % protocolOptions.length]);
    ++index;
  }
  
  return (
    <div onClick={caButton2ClickHandler} className="ca-button2-container">
      <div ref={ref} className="ca-button2">
        <div className="ca-button2-text">{protocol}</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default CaButton2;