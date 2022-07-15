import './ImPanel.css';
import ActionButton from './ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { messageDrawerActions } from '../../store/messagedrawer_slice';
import WSContext from '../../store/ws-context';
import { useContext } from 'react';

const imClasses = [
  { name: "REQUEST", bg: "linear-gradient(rgb(230, 243, 255), rgb(102, 176, 255))", optionButtons: [{ id: 1, text: "Agree" }, { id: 2, text: "Refuse" }, { id: 3, text: "Not Understood" }] },
  { name: "AGREE", bg: "linear-gradient(rgb(222, 231, 203), rgb(156, 183, 98))", optionButtons: [{ id: 4, text: "Okay" }] },
  { name: "REFUSE", bg: "linear-gradient(rgb(255, 214, 204), rgb(255, 112, 77))", optionButtons: [{ id: 4, text: "Okay" }] },
  { name: "NOT_UNDERSTOOD", bg: "linear-gradient(rgb(255, 214, 204), rgb(255, 112, 77))", optionButtons: [{ id: 4, text: "Okay" }] },
  { name: "INFORM", bg: "linear-gradient(rgb(230, 243, 255), rgb(102, 176, 255))", optionButtons: [{ id: 4, text: "Okay" }] },
  { name: "FAILURE", bg: "linear-gradient(rgb(255, 214, 204), rgb(255, 112, 77))", optionButtons: [{ id: 4, text: "Okay" }] },
  { name: "PROPOSE", bg: "linear-gradient(rgb(230, 243, 255), rgb(102, 176, 255))", optionButtons: [{ id: 1, text: "Accept Proposal" }, { id: 2, text: "Reject Proposal" }, { id: 3, text: "Not Understood" }] },
  { name: "ACCEPT_PROPOSAL", bg: "linear-gradient(rgb(230, 243, 255), rgb(102, 176, 255))", optionButtons: [{ id: 1, text: "Okay" }] },
  { name: "REJECT_PROPOSAL", bg: "linear-gradient(rgb(230, 243, 255), rgb(102, 176, 255))", optionButtons: [{ id: 1, text: "Okay" }] },
  { name: "CANCEL", bg: "linear-gradient(rgb(255, 214, 204), rgb(255, 112, 77))", optionButtons: [{ id: 11, text: "Okay" }] },
]

// linear-gradient(rgb(214, 228, 252), rgb(128, 192, 255))
const ImPanel = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.imPanel.isOpen);
  const imData = useSelector((state) => state.imPanel.imData)
  const [, , socket] = useContext(WSContext)
  let imClassButtonOptions = {};

  const optionButtonClickHandler = (id) => {
    console.log(id)
    let ca ="";
    for (let option of imClassButtonOptions) {
      if(id === option.id)
      ca = option.text;
    }

    dispatch(messageDrawerActions.close());
    socket.send(JSON.stringify({
      type: "agent_communication",
      value: {
        sender : "Operator",
        receiver : imData.value.sender,
        context : "",
        communicativeAct : ca.replace(" ","-").toUpperCase(),
        interactionProtocol : imData.value.interactionProtocol,
        conversation_id : imData.value.conversation_id,
        reply_with : "",
        in_reply_to : imData.value.reply_with
      }
    }));
  }

  let optionButtons = [];
  let bg = "";
  const selectClass = () => {
    if (imData.value.communicativeAct === undefined) return;

    // if (imData.value.communicativeAct === )

    for (let cls of imClasses) {
      if (cls.name === imData.value.communicativeAct) {
        console.log("Found", imData.value.communicativeAct);
        bg = cls.bg;
        imClassButtonOptions = cls.optionButtons;
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
        <div className="sender-text">Sender:&#10;&#13;{imData.value.sender}</div>
      </div>
      {/* <div className="IP-container">
        <div className="IP-text">{imData.value.interactionProtocol}</div>
      </div> */}
      <div className="ca-container">
        <div className="ca-text">{imData.value.communicativeAct}<br/>({imData.value.interactionProtocol})</div>
      </div>

      <div className="message-container">
        <div className="message-text">{imData.value.message}</div>
      </div>

      <div className="action-buttons-container2">
        {optionButtons}
      </div>
    </div>
  )
}

export default ImPanel;