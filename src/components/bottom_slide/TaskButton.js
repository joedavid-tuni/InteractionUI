import './TaskButton.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Radius from '../Radius';

const TaskButton = ({name, id, toggle, isSelected, isFloatOut}) => {
  const radius = useSelector((state) => state.config.radius.taskButton);
  const ref = useRef(null);
  const [top, setTop] = useState("-100%");

  useEffect(() => { 
    setTop("0")
  }, [])

  useEffect(() => {
    if (isFloatOut) {
      setTop("100%")
    }
  }, [isFloatOut])
  
  const onClickHandler = () => {
    toggle(id);
  }

  return (
  <div className='task-button-container' style={{top: top}}>
    <div ref={ref} onClick={onClickHandler} className={isSelected ? "task-button selected" : "task-button"}>
      <div className='task-button-text'>{name}</div>
      <Radius radius={radius} parentElement={ref.current}></Radius>
    </div>
  </div>     
  )
}

export default TaskButton;