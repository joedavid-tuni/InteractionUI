import './CancelButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const CancelButton = ({clickHandler}) => {
  const radius = useSelector((state) => state.config.radius.cancelButton);
  const ref = useRef(null);

  return (
    <div className="cancel-button-container">
      <div ref={ref} onClick={clickHandler} className="cancel-button">
        <div className="cancel-button-text">Cancel</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default CancelButton;