import './RightSlide.css';
import RightArrow2 from './RightArrow2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TreeView from './TreeView';
import ProgressWheel from './ProgressWheel';
import TreesDropDown from './TreesDropDown';

const RightSlide = () => {
  const defaultWidth = useSelector((state) => state.config.rightSlideDefaultWidth);
  const isOpen = useSelector((state) => state.rightSlide.isOpen);
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startW, setStartW] = useState(0);

  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth])
  
  // Resize slide with drag bars

  if (isDragging) {
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  const dragMouseDown = (e) => {
    setIsDragging(true);

    e = e || window.event;
    e.preventDefault();
    
    setStartX (e.clientX);
    setStartW (width);
  }

  function elementDrag(e) {
    if (!isDragging) return;
    // var minW = document.getElementById("inner-frame").offsetWidth * 0.1;
    // var maxW = document.getElementById("inner-frame").offsetWidth * 0.5;
    let minW = 100;
    let maxW = 500;
    let w = 0;

    w = startW - e.clientX + startX;
      
    if (w < minW) {w = minW}
    if (w > maxW) {w = maxW}
    
    e = e || window.event;
    e.preventDefault();
    
    setWidth(w);
  }

  function closeDragElement() {    
    setIsDragging(false);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }

  return (
    <div 
      className="right-slide" 
      style={{
        right: isOpen ? "0px" : (width * -1) + "px", 
        width: width + "px", 
        overflow: isOpen ? "visible" : "hidden",
        transition: isDragging ? "0s" : "0.4s"
      }}>
      <div 
        onMouseDown={dragMouseDown} 
        className="right-drag-bar" 
        style={{
          display: isOpen ? "inline-block" : "none",
          width: "30px",
          left: "-15px"
        }}>
      </div>
      <TreeView></TreeView>
      <RightArrow2></RightArrow2>
      <ProgressWheel></ProgressWheel>
      <TreesDropDown></TreesDropDown>      
    </div>
  )
}

export default RightSlide;