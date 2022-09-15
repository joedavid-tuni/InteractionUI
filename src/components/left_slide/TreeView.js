import './TreeView.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TreeElement from './TreeElement';
import TreesDropDown from './TreesDropDown';

const TreeView = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const fontSize = useSelector((state) => state.config.treeView.fontSize);
  const [treeItems, setTreeItems] = useState([]);
  const [treeElements, setTreeElements] = useState(<div />);
  const processPlan = useSelector((state) => state.leftSlide.processPlan);
  const nameofplan = useSelector((state) => state.leftSlide.processPlanName)

  useEffect(() => {
    setTreeItems(processPlan);
  }, [processPlan])
  
  useEffect(() => {
    setTreeItems([]);
  }, []);

  useEffect(() => {
    let tempElements = [];
    for (let element of treeItems) {
      tempElements.push(<TreeElement key={element.key} element={element} />);
    }
    if (tempElements.length === 0) {
      tempElements = <p className='tree-elements-left'>Nothing to display.</p>
    }

    setTreeElements(tempElements);
  }, [treeItems]);

  // TODO: write a function to caluclate the amount of tree view elements that have status complete

  const calculateCompleted = ()=>{
    
  }
  
  return (
    <div className="ul-list-container-left" style={{
      height: height + "%"
    }}>
      <div className="heading1-left">Production Task:</div>
      <TreesDropDown></TreesDropDown>
      <div className="heading2-left">Selected Process:&nbsp;&nbsp;{nameofplan}</div>
      <div className="tree-container-left">
        <ul style={{fontSize: fontSize + "px"}} className="main-list-left">
          {treeElements}
        </ul>
      </div>
    </div>   
  )
}

export default TreeView;