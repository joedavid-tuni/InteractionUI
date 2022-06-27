import './InnerFrame.css';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import SettingsButton from './SettingsButton';
import StartStopButton from './StartStopButton';
import CaButton from './CaButton';
import LeftSlide from '../left_slide/LeftSlide';
import RightSlide from '../right_slide/RightSlide';
import BottomSlide from '../bottom_slide/BottomSlide';
import ImPanel from '../im_panel/ImPanel';
import { useSelector } from 'react-redux';

const InnerFrame = () => {  
  const config = useSelector((state) => state.config.innerFrame);
  
  return (
    <div className='inner-frame' style={{
      left: config.left + "px",
      top: config.top + "px",
      width: config.width + "px",
      height: config.height + "px"
    }}>
      <LeftArrow></LeftArrow>
      <RightArrow></RightArrow>
      <SettingsButton></SettingsButton>
      <StartStopButton></StartStopButton>
      <CaButton ></CaButton>
      <LeftSlide></LeftSlide>
      <RightSlide></RightSlide>
      <BottomSlide ></BottomSlide>
      <ImPanel ></ImPanel>
    </div>
  )
}

export default InnerFrame