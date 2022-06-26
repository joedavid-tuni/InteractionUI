import './SendButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const SendButton = ({isEnabled, clichHandler}) => {
  const radius = useSelector((state) => state.config.radius.sendButton);
  const ref = useRef(null);
  
  return (
    <div className="send-button-container">
      <div ref={ref} onClick={isEnabled ? clichHandler : () => {}} className={isEnabled ? "send-button" : "send-button disabled"}>
        <div className="send-button-text">Send</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default SendButton;