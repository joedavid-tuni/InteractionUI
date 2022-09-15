import './ProcessDescriptionDrawer.css';
import LeftArrow2 from './LeftArrow2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrimititveTasks from './PrimitiveTasks'



const ProcessDescription = () => {
  const defaultWidth = useSelector((state) => state.config.leftSlideDefaultWidth);
  const isOpen = useSelector((state) => state.processDescripion.isOpen);
  const processName = useSelector((state) => state.leftSlide.processPlanName);
  const taskItems = useSelector((state)=> state.processDescripion.processDescription)
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startW, setStartW] = useState(0);
  const [imgPath, setImgPath] = useState("./img_unavailable.jpg");
  const [sentences, setSentences] = useState([{ id: 0, text: "List not available" }]);
  // Resize slide with drag bars

  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth])

  if (isDragging) {
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  const dragMouseDown = (e) => {
    setIsDragging(true);

    e = e || window.event;
    e.preventDefault();

    setStartX(e.clientX);
    setStartW(width);
  }

  function elementDrag(e) {
    if (!isDragging) return;
    let minW = 100;
    let maxW = 500;
    let w = 0;

    w = startW + e.clientX - startX;

    if (w < minW) { w = minW }
    if (w > maxW) { w = maxW }

    e = e || window.event;
    e.preventDefault();

    setWidth(w);
  }

  function closeDragElement() {
    setIsDragging(false);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }



  // TODO: fetch



  return (
    <div
      className="pd-drawer"
      style={{
        left: isOpen ? "0px" : (width * -1) + "px",
        width: width + "px",
        overflow: isOpen ? "visible" : "hidden",
        transition: isDragging ? "0s" : "0.4s"
      }}>
      <div
        onMouseDown={dragMouseDown}
        className="left-drag-bar"
        style={{ display: isOpen ? "inline-block" : "none" }}>
      </div>
      <a className='title'>Process: {processName}</a>

      <PrimititveTasks tasks={taskItems}></PrimititveTasks>

      <LeftArrow2></LeftArrow2>
    </div>
  )
}

export default ProcessDescription;