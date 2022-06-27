import OuterFrame from './components/OuterFrame';
import ModalOverlay from './components/ModalOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { blinkingActions } from './store/blinking_slice';
import { configActions } from './store/config_slice';
import WSContext from './store/ws-context';
import {WSContextProvider} from './store/ws-context';
import useSocket from './hooks/use-socket';

function App() {
  const tree = useSelector((state) => state.rightSlide.tree);
  const dispatch = useDispatch();
  // const [socket, setSocket] = useState();
  // const [isReady, msg, socket] = useSocket();
  const [isOpen, msg, socket] = useSocket()

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

  const blinking = () => {
    setTimeout(() => {
      dispatch(blinkingActions.toggleBlinkingState());
      blinking();
    }, 500);
  }
  

  return (
    <WSContextProvider >
      <OuterFrame />
      <ModalOverlay></ModalOverlay>
    </WSContextProvider>
  );
}

export default App;