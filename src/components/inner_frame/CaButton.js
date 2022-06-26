import './CaButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { bottomSlideActions } from '../../store';
import { useRef } from 'react';
import Radius from '../Radius';

const CaButton = ({socket}) => {
  const radius = useSelector((state) => state.config.radius.caButton);
  const ref = useRef(null);

  const dispatch = useDispatch();

  const bottomFloatIn = () => {
    dispatch(bottomSlideActions.open());

    // Uncomment the line below to request tree item element change via websocket
    //socket.send(JSON.stringify({type: "getResponse"}))
  }

  return (
    <div className="ca-button-container" onClick={bottomFloatIn}>
      <div ref={ref} className="ca-button">
        <div className="ca-button-text">CA</div>      
        <Radius radius={radius} parentElement={ref.current}></Radius>    
      </div>        
    </div>
  )
}

export default CaButton;