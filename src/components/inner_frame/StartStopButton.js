import './StartStopButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const StopStartButton = () => {
  const radius = useSelector((state) => state.config.radius.stopStartButton);
  const ref = useRef(null);

  const startStopClickHandler = () => {
    console.log("Start stop button clicked");
  }

  return (
    <div className="start-stop-button" onClick={startStopClickHandler}>
      <div ref={ref} className="start-stop-button2">
        <div className="start-stop-text">Stop / Start</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>    
      </div>
    </div>
  )
}

export default StopStartButton;