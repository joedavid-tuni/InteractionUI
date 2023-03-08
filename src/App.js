import OuterFrame from './components/OuterFrame';
import ModalOverlay from './components/ModalOverlay';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { blinkingActions } from './store/blinking_slice';
import { configActions } from './store/config_slice';
import WSContext from './store/ws-context';
import { WSContextProvider } from './store/ws-context';

function App() {

  const dispatch = useDispatch();

  const val = useContext(WSContext);

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
          caButton: 100,
          arrow: 50,
          updateButton: 80,
          stopStartButton: 80,
          settingsButton: 80
        },
        innerFrame: {
          left: 135,
          top: 0,
          width: 1561, 
          height: 1062
        },
        dragBarsWidth: 50,
        arrowHeight: 100,
        treeView: {
          height: 60,
          fontSize: 16
        },
        rightSlideDefaultWidth: 432,
        leftSlideDefaultWidth: 410
      }

      dispatch(configActions.updateConfig(configJson));
    }, 500);
  }

  const blinking = () => { // toggles app-wide blinking for all tree elements and canvas polygons
    setTimeout(() => {
      dispatch(blinkingActions.toggleBlinkingState());
      blinking();
    }, 500);
  }


  return (
    <WSContextProvider value={val}>
        <OuterFrame />
        <ModalOverlay></ModalOverlay>
    </WSContextProvider>
  );
}

export default App;