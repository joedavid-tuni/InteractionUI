import './OuterFrame.css';
import InnerFrame from './inner_frame/InnerFrame';
import Canvas from './canvas/Canvas';

const OuterFrame = ({socket}) => {
  return (
    <div className='outer-frame'>
      <InnerFrame socket={socket}/>
      <Canvas />
    </div>
  )
}

export default OuterFrame;