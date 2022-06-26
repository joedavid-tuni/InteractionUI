import { useState } from 'react';
import './ReceiverButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';

const ReceiverButton = (props) => {
  const radius = useSelector((state) => state.config.radius.receiverButton);
  const ref = useRef(null);
  const receiverOptions = ["Receiver 1", "Receiver 2", "Receiver 3"];
  const [receiverIndex, setReceiverIndex] = useState(0);

  const receiverButtonClickHandler = () => {
    let index = receiverIndex + 1;
    if (index > receiverOptions.length - 1) {
      index = 0;
    }
    setReceiverIndex(index);

    props.changeReceiverIndex(index);
  }

  return (
    <div onClick={receiverButtonClickHandler} className="receiver-button-container">
      <div ref={ref} className="receiver-button">
        <div className="receiver-button-text">{receiverOptions[receiverIndex]}</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default ReceiverButton;