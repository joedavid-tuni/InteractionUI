import './ImPanel.css';
import ActionButton from './ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { messageDrawerActions } from '../../store/messagedrawer_slice';
import WSContext from '../../store/ws-context';
import { useContext } from 'react';

const imClasses = [
  {name: "class 1", bg: "linear-gradient(rgb(214, 228, 252), rgb(128, 192, 255))", optionButtons: [{id: 1, text: "option 1"}, {id: 2, text: "option 2"}, {id: 3, text: "option 3"}]},
  {name: "class 2", bg: "linear-gradient(rgb(252, 228, 214), rgb(255, 192, 128))", optionButtons: [{id: 4, text: "option 4"}, {id: 5, text: "option 5"}, {id: 6, text: "option 6"}]},
  {name: "class 3", bg: "linear-gradient(rgb(252, 214, 228), rgb(255, 128, 192))", optionButtons: [{id: 7, text: "option 7"}, {id: 8, text: "option 8"}]},
  {name: "class 4", bg: "linear-gradient(rgb(214, 252, 228), rgb(128, 255, 192))", optionButtons: [{id: 9, text: "option 9"}, {id: 10, text: "option 10"}]},
  {name: "class 5", bg: "linear-gradient(rgb(228, 252, 214), rgb(192, 255, 128))", optionButtons: [{id: 11, text: "option 11"}]}
]
const ImPanel = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.imPanel.isOpen);
  const imData = useSelector((state) => state.imPanel.imData)
  const [, , socket] = useContext(WSContext)

  const optionButtonClickHandler = (id) => {
    console.log(id)
    dispatch(messageDrawerActions.close());
    socket.send(JSON.stringify({
      type: "option-selection",
      values: [id]
    }));
  }

  let optionButtons = [];
  let bg = "";
  const selectClass = () => {
    if (imData.class === undefined) return;

    for (let cls of imClasses) {
      if (cls.name === imData.class) {
        bg = cls.bg;
        optionButtons = cls.optionButtons.map(button =>
          <ActionButton clickHandler={optionButtonClickHandler} key={button.id} id={button.id} text={button.text} buttonsCount={cls.optionButtons.length}></ActionButton>
        )
      }
    }
  }
  selectClass();
  
  return (    
    <div 
    className='im-panel'
    style={{
      bottom: isOpen ? "0%" : "-20%",
      backgroundImage: bg
    }}>
      <div className="sender-container">
          <div className="sender-text">{imData.sender}</div>
      </div>
      <div className="ca-container">
          <div className="ca-text">{imData.ca}</div>
      </div>

      <div className="message-container">
          <div className="message-text">{imData.message}</div>
      </div>

      <div className="action-buttons-container2">
        {optionButtons}
      </div>
    </div> 
  )
}

export default ImPanel;