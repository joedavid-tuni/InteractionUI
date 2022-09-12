import './LeftSlide.css';
import LeftArrow2 from './LeftArrow2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateButton from './UpdateButton';

const dummySentences = [{id: 5, text: "Some other sentences"}, {id: 6, text: "This is for the second set of sentences"}, {id: 7, text: "Blah-blah-blah"}]
const dummySentences2 = [{id: 1, text: "This is a random sentence for the bulleted list."}, {id: 2, text: "This is another sentence for the bulleted list"}, {id: 3, text: "Short sentence"}, {id: 4, text: "This is meant to be a longer sentence, that is going to be displayed in the bulleted list, which can be found in the left slide in section."}
]

const LeftSlide = () => {
  const defaultWidth = useSelector((state) => state.config.leftSlideDefaultWidth);
  const isOpen = useSelector((state) => state.leftSlide.isOpen);
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startW, setStartW] = useState(0);
  const [imgPath, setImgPath] = useState("./img_unavailable.jpg");
  const [sentences, setSentences] = useState([{id: 0, text: "List not available"}]);
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
    
    setStartX (e.clientX);
    setStartW (width);
  }

  function elementDrag(e) {
    if (!isDragging) return;
    let minW = 100;
    let maxW = 500;
    let w = 0;

    w = startW + e.clientX - startX;
      
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

  const update = () => {
    setTimeout(() => {
      if (imgPath == "./img2.jpg") {
        setImgPath("./img1.jpg")
        setSentences(dummySentences);
      } else {
        setImgPath("./img2.png")
        setSentences(dummySentences2);
      }
    }, 1000);
  }

  return (
    <div 
      className="left-slide" 
      style={{
        left: isOpen ? "0px" : (width * -1) + "px", 
        width: width + "px", 
        overflow: isOpen ? "visible" : "hidden",
        transition: isDragging ? "0s" : "0.4s"
      }}>
      <div 
        onMouseDown={dragMouseDown} 
        className="left-drag-bar" 
        style={{display: isOpen ? "inline-block" : "none"}}>
      </div>

      <div className="image-container">
        <img className="img" src={imgPath}></img>
      </div>

      <div className="ul-list-container">
        <ul className="ul-list">
          {sentences.map(sentence =>
            <li key={sentence.id}>{sentence.text}</li>
          )}
        </ul>
      </div>

      <UpdateButton update={update}></UpdateButton>

      <LeftArrow2></LeftArrow2>
    </div>
  )
}

export default LeftSlide;