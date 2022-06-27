import './BottomSlide.css';
import CaButton2 from './CaButton2';
import ReceiverButton from './ReceiverButton';
import TaskButton from './TaskButton';
import SendButton from './SendButton';
import CancelButton from './CancelButton';
import { useEffect, useState } from 'react';    
import { useDispatch, useSelector } from 'react-redux';
import { interactionActions } from '../../store/interactiondrawer_slice';
import useSocket from '../../hooks/use-socket';
 
const BottomSlide = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.bottomSlide.isOpen);
  const [caIndex, setCaIndex] = useState(0);
  const [receiverIndex, setReceiverIndex] = useState(0);
  const [fetchTaskTimer, setFetchTaskTimer] = useState();
  const [taskList, setTaskList] = useState([]);
  const [taskComponents, setTaskComponents] = useState();
  const [isFloatOut, setIsFloatOut] = useState(false);
  const [isReady, msg, socket] = useSocket()
  const changeCaIndex = (index) => {
    setCaIndex(index)
  }
  const changeReceiverIndex = (index) => {
    setReceiverIndex(index)
  }

  useEffect(() => {
    clearTimeout(fetchTaskTimer);
    let timer = setTimeout(() => {
      setIsFloatOut(false);
      //Fetch tasks here
      setTimeout(() => {
        if (caIndex == 1 && receiverIndex == 1) {
          setTaskList([{name: "Task 1", id: 1, isSelected: false}])
        } else if (caIndex == 2 && receiverIndex == 2) {
          setTaskList([{name: "Task 1", id: 2, isSelected: false}, {name: "Task 2", id: 3, isSelected: false}, {name: "Task 3", id: 4, isSelected: false}, {name: "Task 4", id: 5, isSelected: false}])
        } else {
          setTaskList([]);
        }
      }, 100);      
    }, 1000);
    setTimeout(() => {
      setTaskList([]);
    }, 500);  
    setFetchTaskTimer(timer);
    setIsFloatOut(true);
  }, [caIndex, receiverIndex])
  
  useEffect(() => {    
    let components = taskList.map((task) => (
      <TaskButton isFloatOut={isFloatOut} key={task.id} name={task.name} id={task.id} isSelected={task.isSelected} toggle={toggleTask}/>
    ));
    setTaskComponents(components);
  }, [taskList, receiverIndex, caIndex, isFloatOut])

  const toggleTask = (id) => {  
    let tempTaskList = JSON.parse(JSON.stringify(taskList));
    
    for (let task of tempTaskList) {
      if (task.id == id) {
        task.isSelected = !task.isSelected;
      }
    }
    setTaskList(tempTaskList);
  }

  const closeBottomSlide = () => {
    dispatch(interactionActions.close());
  }

  const sendClick = () => {
    let selectedTasks = 0;    
    for (let task of taskList) {
      if (task.isSelected) {
        selectedTasks += task.id;
      }
    }

    socket.send(JSON.stringify({type: "taskList", values: [receiverIndex, caIndex, selectedTasks]}));
  }
  
  let isSendEnabled = false;
  for (let task of taskList) {
    if (task.isSelected && !isFloatOut) {
      isSendEnabled = true;
    }
  }
  return (    
    <div className="bottom-slide" style={{bottom: isOpen ? "0%" : "-20%" }}>
      <div className="select-buttons-container">
        <ReceiverButton changeReceiverIndex={changeReceiverIndex}></ReceiverButton>
        <CaButton2 changeCaIndex={changeCaIndex}></CaButton2>
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