import './ActionButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const ActionButton = ({ clickHandler, id, text, buttonsCount }) => {
  const radius = useSelector((state) => state.config.radius.actionButton);
  const ref = useRef(null);
 
  const onClickHandler = () => {
    clickHandler(id);
  }
  return (
    <div className="action-button-container" style={{width: (100 / buttonsCount) + "%"}}>
      <div ref={ref} onClick={onClickHandler} className="action-button" style={{width: ref.current ? ref.current.clientHeight * 1.2 + "px" : "0"}}>
        <div className="action-button-text">{text}</div>        
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default ActionButton;