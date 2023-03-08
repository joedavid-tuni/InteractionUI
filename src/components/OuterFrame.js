import './OuterFrame.css';
import InnerFrame from './inner_frame/InnerFrame';
import Canvas from './canvas/Canvas';

const OuterFrame = () => {

  document.addEventListener('contextmenu', event=> event.preventDefault()); // prevents right clicks on page
  return (
    <div className='outer-frame'>
      <InnerFrame />
      <Canvas />
    </div>
  )
}

export default OuterFrame;