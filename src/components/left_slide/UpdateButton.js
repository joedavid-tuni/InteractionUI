import './UpdateButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const UpdateButton = (props) => {
  const radius = useSelector((state) => state.config.radius.updateButton);
  const ref = useRef(null);

  return (
    <div className="update-button-container" onClick={props.update}>
      <div ref={ref} className="update-button">
        <div className="update-text">Update</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>          
    </div>
  )
}

export default UpdateButton;