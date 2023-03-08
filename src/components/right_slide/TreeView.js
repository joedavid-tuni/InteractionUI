import './TreeView.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TreeElement from './TreeElement';

const TreeView = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const fontSize = useSelector((state) => state.config.treeView.fontSize);
  const [treeItems, setTreeItems] = useState([]);
  const [treeElements, setTreeElements] = useState(<div />);
  const tree = useSelector((state) => state.rightSlide.tree);

  useEffect(() => {
    setTreeItems(tree);
  }, [tree])
  
  useEffect(() => {
    setTreeItems([]);
  }, []);

  useEffect(() => {
    let tempElements = [];
    for (let element of treeItems) {
      tempElements.push(<TreeElement key={element.key} element={element} />);
    }
    if (tempElements.length === 0) {
      tempElements = <p style={{color: "#fff", fontSize: "20px"}}>No Production Tasks Available. Please select a Workplan from below</p>
    }

    setTreeElements(tempElements);
  }, [treeItems]);

  
  
  return (
    <div className="tree-container" style={{
      height: height + "%"
    }}>
      <div className="tree-container2">
        <ul style={{fontSize: fontSize + "px"}} className="main-list">
          {treeElements}
        </ul>
      </div>
    </div>   
  )
}

export default TreeView;