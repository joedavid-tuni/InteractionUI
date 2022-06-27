import OuterFrame from './components/OuterFrame';
import ModalOverlay from './components/ModalOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { blinkingActions, canvasActions, rightSlideActions, imPanelActions, configActions } from './store/index';
import WSContext from './store/ws-context';
import {WSContextProvider} from './store/ws-context';
import useSocket from './hooks/use-socket';

function App() {
  const tree = useSelector((state) => state.rightSlide.tree);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const ws = useSocket();

  useEffect(() => {
    blinking();
    updateConfig();
  }, [])

  const updateConfig = () => {
    setTimeout(() => {
      let configJson = {
        radius: {
          caButton2: 0,
          cancelButton: 0,
          receiverButton: 0,
          sendButton: 0,
          taskButton: 0,
          actionButton: 0,
          caButton: 0,
          arrow: 0,
          updateButton: 0,
          stopStartButton: 0,
          settingsButton: 0
        },
        innerFrame:{
          left: 135,
          top: 0,
          width: 1561,
          height: 1062
        },
        dragBarsWidth: 10,
        arrowHeight: 100,
        treeView:{
          height: 60,
          fontSize: 16
        },
        rightSlideDefaultWidth: 350,
        leftSlideDefaultWidth: 350
      }
      
      dispatch(configActions.updateConfig(configJson));
    }, 6000);
  }

  const fetchScreenParams = () => {
    let contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const pageWidth = Math.min(document.body.scrollWidth, contentWidth);
    const pageHeight = document.body.scrollHeight;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pageX = document.body.getBoundingClientRect().x;
    const pageY = document.body.getBoundingClientRect().y;
    const screenX = window.screenX; //Return the x  coordinates of the window relative to the screen
    const screenY = window.screenY //- (window.outerHeight - window.innerHeight); //Return the y coordinates of the window relative to the screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let currentScreenParameters = {
      type: "currentScreenParameters",
      values: [windowWidth, windowHeight, pageWidth, pageHeight, screenWidth, screenHeight, pageX, pageY, screenX,
        screenY, viewportWidth, viewportHeight]
    }
    return JSON.stringify(currentScreenParameters)
  }

  useEffect(() => {
    // let s = new WebSocket("ws://127.0.0.1:8887");

    ws.onopen = function(e) {
      console.log("[open] Connection established with Server");
    };
  
    ws.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        alert('[close] Connection died');
      }
    };
  
    ws.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };

    setSocket(ws);
  }, [])
  
  useEffect (() => {
    if (socket == undefined) return;

    socket.onmessage = function(event) {  
      console.log(event.data);
      let msgOBJ = JSON.parse(event.data);

      switch (msgOBJ.type) {
        case "requestScreenParams":
          socket.send(fetchScreenParams());

          return;
        case "tree-status-change":
          const updateTreeElement = (t, key, state) => {
            let element;
            // Loop through each element in the tree
            for (let e of t) {
              if (e.key == key) {
                // If key found, update the state
                return e.state = state;
              }
              if (!e.items == undefined) {
                // Recursive function (Calls itself if there are sub elements)
                element = updateTreeElement(e.items, key, state);
                if (!element == undefined) {
                  // If key found, update the state
                  return element.state = state;
                }
              }
            }
          } 

          // Create a copy of the current tree
          let tempTree = JSON.parse(JSON.stringify(tree));
          
          // Update a single element in the tempTree
          // msgOBJ.key = The unique key of the element to be updated
          // msgOBJ.state = The updated version of the selected element
          updateTreeElement(tempTree, msgOBJ.key, msgOBJ.state);
          
          // Update the original tree with the tempTree
          dispatch(rightSlideActions.setTree(tempTree));
          
          return;
        case "canvas-polygon-drawing":     
          dispatch(canvasActions.handleInput(msgOBJ.values));

          return;
        case "configData":
          // setConfig2(msgOBJ); // Configure UI via socket
          return;
        case "im-message":          
          dispatch(imPanelActions.setImData(msgOBJ));
          dispatch(imPanelActions.open());
      }
      console.log(msgOBJ)
    };
  }, [tree])

  const blinking = () => {
    setTimeout(() => {
      dispatch(blinkingActions.toggleBlinkingState());
      blinking();
    }, 500);
  }
  

  return (
    <WSContextProvider >
      <OuterFrame socket={socket}/>
      <ModalOverlay></ModalOverlay>
    </WSContextProvider>
  );
}

export default App;