import './BottomSlide.css';
import CaButton2 from './CaButton2';
import ReceiverButton from './ReceiverButton';
import TaskButton from './TaskButton';
import SendButton from './SendButton';
import CancelButton from './CancelButton';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { interactionActions } from '../../store/interactiondrawer_slice';
import WSContext from '../../store/ws-context';

let requestedAndProposedTasks = new Object();

const BottomSlide = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.bottomSlide.isOpen);
  // const [caIndex, setCaIndex] = useState(0);
  const [protocol, setProtocol] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const [fetchTaskTimer, setFetchTaskTimer] = useState();
  const [taskList, setTaskList] = useState([]);
  const [taskComponents, setTaskComponents] = useState();
  const [isFloatOut, setIsFloatOut] = useState(false);
  const [, , socket] = useContext(WSContext)
  const changeProtocolHandler = (protocol) => {
    setProtocol(protocol)
  }
  const changeCurrentTask = (taskObj) => {
    setCurrentTask(taskObj)
  }


  useEffect(() => {

    clearTimeout(fetchTaskTimer);

    let timer = setTimeout(() => {
      setIsFloatOut(false);
      // todo: Fetch tasks here
      setTimeout(() => {
        // console.log("Indices", caIndex, receiverIndex)
        if (protocol === "propose" && currentTask === 1) {
          setTaskList([{ name: "Task 1", id: 1, isSelected: false }])
        } else if (protocol === "request" && currentTask === 2) {
          setTaskList([{ name: "Task 1", id: 2, isSelected: false }, { name: "Task 2", id: 3, isSelected: false }, { name: "Task 3", id: 4, isSelected: false }, { name: "Task 4", id: 5, isSelected: false }])
        } else {
          setTaskList([]);
        }
      }, 100);
    }, 1000);

    // not sure what this is doing, but you did this for some reason
    // setTimeout(() => {
    //   setTaskList([]);
    // }, 500);

    setFetchTaskTimer(timer);

    setIsFloatOut(true);

  }, [protocol, currentTask])

  useEffect(() => {
    
    let components = taskList.map((task) => (
      <TaskButton isFloatOut={isFloatOut} key={task.id} name={task.name} id={task.id} isSelected={task.isSelected} toggle={toggleTask} />
    ));
    setTaskComponents(components);
  }, [taskList, currentTask, protocol, isFloatOut])

  const toggleTask = (id) => {
    let tempTaskList = JSON.parse(JSON.stringify(taskList));

    for (let task of tempTaskList) {
      if (task.id === id) {
        task.isSelected = !task.isSelected;
      }
    }
    setTaskList(tempTaskList);
  }

  const closeBottomSlide = () => {
    dispatch(interactionActions.close());
  }

  const sendClick = () => {
    dispatch(interactionActions.close());
    let _interactionProtocol = "";
    let selectedTasks = 0;
    for (let task of taskList) {
      if (task.isSelected) {
        selectedTasks += task.id;
      }
    }
    if (protocol != "Inform") {  //todo: change to "performative"
      // if anything else as performative other than inform, you construct a proper corresponding IP
      requestedAndProposedTasks[currentTask.task] = protocol;
      _interactionProtocol = "fipa-" + protocol.toLowerCase();
    }
    else{
      // if inform as performative, you make the task name as IP?
      _interactionProtocol  = requestedAndProposedTasks[currentTask.task];
      // do you want to have fipa-propose as IP? because you would only be informing after you propose?
    }
    
    console.log("IP: ", _interactionProtocol)
    console.log("CA: ",  protocol.toUpperCase())

    // socket.send(JSON.stringify({ type: "agent_communication", value: [currentTask, protocol, selectedTasks] }));
    socket.send(JSON.stringify({
      type: "agent_communication",
      value: {
        sender: "Operator",
        receiver: "Robot",
        context: "Achieve Rational Effect",
        communicativeAct: protocol.toUpperCase(),
        interactionProtocol: _interactionProtocol,
        conversation_id: protocol.toLowerCase() + "_" + currentTask.task,
        reply_with: protocol + " " + currentTask.task + " reply",
      }
    }));
  }

  let isSendEnabled = true;//make false to have it when tasks only is selected
  for (let task of taskList) {
    if (task.isSelected && !isFloatOut) {
      isSendEnabled = true;
    }
  }
  // CAButton2: todo: change to "performative"
  return (
    <div className="bottom-slide" style={{ bottom: isOpen ? "0%" : "-20%" }}>
      <div className="select-buttons-container">
        <CaButton2 changeProtocol={changeProtocolHandler}></CaButton2> 
        <ReceiverButton changeCurrentTask={changeCurrentTask} protocol={protocol}></ReceiverButton>
      </div>
      <div className="tasks-list-container">
        {taskComponents}
      </div>
      <div className="action-buttons-container">
        <SendButton isEnabled={isSendEnabled} clichHandler={sendClick}></SendButton>
        <CancelButton clickHandler={closeBottomSlide}></CancelButton>
      </div>
    </div>
  )
}

export default BottomSlide;