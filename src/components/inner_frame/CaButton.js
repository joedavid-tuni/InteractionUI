import './CaButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { interactionActions } from '../../store/interactiondrawer_slice';
import { useRef } from 'react';
import Radius from '../Radius';
import useSocket from '../../hooks/use-socket';

const CaButton = () => {
  const radius = useSelector((state) => state.config.radius.caButton);
  const ref = useRef(null);
  const [isOpen, msg, socket] = useSocket();

  const dispatch = useDispatch();

  const bottomFloatIn = () => {
    dispatch(interactionActions.open());

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