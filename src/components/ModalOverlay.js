import { useEffect, useState } from 'react';
import './ModalOverlay.css'
const ModalOverlay = () => {
  const [displayStyle, setDisplayStyle] = useState("inline-block");

  // Display a modal overlay if not full screen
  useEffect(() => {
    window.onresize = () => {
      checkIfFullScreen()
    }
    checkIfFullScreen();
  }, [])

  document.documentElement.onfullscreenchange = function(e) {
    if (!document.fullscreenElement) {
      setDisplayStyle("inline-block");
    } else {
      if (document.exitFullscreen) {
        setDisplayStyle("none");
      }
    }
  }  

  const checkIfFullScreen = () => {
    let maxHeight = window.screen.height,
      maxWidth = window.screen.width,
      curHeight = window.innerHeight,
      curWidth = window.innerWidth;
    
    if (maxWidth == curWidth && maxHeight == curHeight) {
      setDisplayStyle("none");
    } else {
      setDisplayStyle("inline-block");
    }
  }
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div style={{display: displayStyle}} onClick={toggleFullScreen} className="cover">
      <div className="cover-title">Click anywhere to enter full screen mode an display the UI.</div>
    </div>
  )
}

export default ModalOverlay;