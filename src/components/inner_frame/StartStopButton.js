import './StartStopButton.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState, useContext } from 'react';
import Radius from '../Radius';
import { useDispatch } from 'react-redux';
import { kinectActions } from '../../store/kinect_slice';
import WSContext from '../../store/ws-context'

const StopStartButton = () => {
  const onState = useSelector((state) => state.kinect.onState);
  const radius = useSelector((state) => state.config.radius.stopStartButton);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [onOffStateText, setOnOffStateText] = useState("Start")
  const [, , socket] = useContext(WSContext)

  const startStopClickHandler = () => {
    console.log("Start stop button clicked");
    console.log("Setting Kinect ", !onState)
    dispatch(kinectActions.toggleOnState(!onState));
    if(onState){
      setOnOffStateText("Stop");
      console.log("Turning Kinect On")
      socket.send(JSON.stringify({
        type: "start_kinect",
        value: {
        }
      }));
    }
    else{
      setOnOffStateText("Start");
      console.log("Turning Kinect Off")
      socket.send(JSON.stringify({
        type: "stop_kinect",
        value: {
        }
      }));
    }
  }

  // useEffect(()=>{
   
  // },[onState])

  return (
    <div className="start-stop-button" onClick={startStopClickHandler}>
      <div ref={ref} className="start-stop-button2">
        <div className="start-stop-text"> {onOffStateText} Kinect</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>    
      </div>
    </div>
  )
}

export default StopStartButton;